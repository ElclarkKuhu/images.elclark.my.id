// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface Platform {
			env: {
				STATIC: R2Bucket;
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
			caches: Cache;
		}
	}
}

export {};
