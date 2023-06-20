import sharp from 'sharp';

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

export const POST: RequestHandler = async ({ fetch, request, params, platform }) => {
	if (!platform) {
		throw error(500, 'Internal server error');
	}

	const connection = connect({
		host: DATABASE_HOST,
		username: DATABASE_USERNAME,
		password: DATABASE_PASSWORD,
		fetch: (url: any, init: any) => {
			delete init['cache'];
			return fetch(url, init);
		}
	});

	const { slug } = params;

	if (!slug) {
		throw error(404, 'Not found');
	}

	const { rows } = await connection.execute('SELECT * FROM images WHERE slug = ?', [slug]);

	if (rows.length > 0) {
		throw error(409, 'Conflict');
	}

	const form = await request.formData();
	const image = form.get('image') as File;

	if (!image) {
		throw error(400, 'Bad request');
	}

	const buffer = await image.arrayBuffer();
	const description = form.get('description');

	const { data, info } = await sharp(buffer).webp().toBuffer({ resolveWithObject: true });
	console.log(info);

	await platform.STATIC.put(`${STATIC_PATH}/${slug}.webp`, data);

	// CREATE TABLE images (
	// 	id INT PRIMARY KEY AUTO_INCREMENT,
	// 	slug VARCHAR(16) NOT NULL UNIQUE,
	// 	description VARCHAR(300),
	// 	time BIGINT,
	// 	size INT
	// );

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
				'content-type': 'application/json'
			}
		}
	);
};
