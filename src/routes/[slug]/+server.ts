import { error } from '@sveltejs/kit';
import { connect } from '@planetscale/database';
import {
	DATABASE_HOST,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	STATIC_URL,
	STATIC_PATH
} from '$env/static/private';

import type { RequestHandler } from './$types';

const authenticated = false;

export const POST: RequestHandler = async ({ fetch, request, params, platform }) => {
	if (!platform) {
		throw error(500, 'Internal server error');
	}

	if (!authenticated) {
		throw error(401, 'Unauthorized');
	}

	const { slug } = params;

	if (!slug) {
		throw error(404, 'Not found');
	}

	if (slug.length > 16) {
		throw error(400, 'Slug is too long!');
	}

	const connection = connect({
		host: DATABASE_HOST,
		username: DATABASE_USERNAME,
		password: DATABASE_PASSWORD,
		fetch: (url: RequestInfo | URL, init: RequestInit | undefined) => {
			if (init) {
				delete init['cache'];
			}

			return fetch(url, init);
		}
	});

	const { rows } = await connection.execute('SELECT * FROM images WHERE slug = ?', [slug]);

	if (rows.length > 0) {
		throw error(409, 'Conflict');
	}

	const form = await request.formData();
	const image = form.get('image') as File;

	if (!image) {
		throw error(400, 'Bad request');
	}

	if (image.type !== 'image/webp') {
		throw error(415, 'Unsupported media type');
	}

	if (image.size > 1024 * 1024 * 5) {
		throw error(413, 'Payload too large');
	}

	const buffer = await image.arrayBuffer();
	const description = form.get('description');

	if (description) {
		if (description.toString().length > 300) {
			throw error(400, 'Description is too long!');
		}
	}

	await platform.env.STATIC.put(`${STATIC_PATH}/${slug}.webp`, buffer);

	await connection.execute(
		'INSERT INTO images (slug, description, size, time) VALUES (?, ?, ?, ?)',
		[slug, description, image.size, Date.now()]
	);

	return new Response(
		JSON.stringify({
			image: `${STATIC_URL}/${STATIC_PATH}/${slug}.webp`,
			description: description
		}),
		{
			status: 201,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-store'
			}
		}
	);
};
