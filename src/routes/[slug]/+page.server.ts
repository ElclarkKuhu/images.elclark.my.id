import { error } from '@sveltejs/kit';
import { connect } from '@planetscale/database';
import {
	DATABASE_HOST,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	STATIC_URL,
	STATIC_PATH
} from '$env/static/private';

import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	if (!params.slug) {
		throw error(404, 'Not found');
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

	const { rows } = await connection.execute('SELECT * FROM images WHERE slug = ?', [params.slug]);

	if (rows.length > 0) {
		const image = rows[0] as {
			id: number;
			slug: string;
			size: number;
			time: number;
			description: string;
		};

		return {
			image: `${STATIC_URL}/${STATIC_PATH}/${image.slug}.webp`
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
