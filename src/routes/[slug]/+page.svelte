<script lang="ts">
	import Header from './header.svelte';
	import { page } from '$app/stores';

	import type { PageData } from './$types';

	export let data: PageData;
	let { image, description, size, time } = data;

	function fullscreen() {
		const image = document.querySelector('img');

		if (image) {
			if (!document.fullscreenElement) {
				image.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}
	}

	function formatBytes(bytes: number, decimals = 2) {
		if (bytes === 0) return '0 Bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	function formatDate(date: number) {
		const d = new Date(date);

		return d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>
		Elclark Images - {$page.params.slug}
	</title>
</svelte:head>

<div class="container">
	<Header {image} />

	<button class="image-fullscreen" on:click={fullscreen}>
		<img src={image} alt="User Uploaded" />
	</button>

	<div class="info">
		<div class="details">
			<p class="time">{formatDate(time)}</p>
			<p class="size">{formatBytes(size)}</p>
		</div>
		{#if description}
			<h2 class="description headline-small">{description}</h2>
		{/if}
	</div>
</div>

<style>
	.container {
		--padding: 0.5rem;
		--max-width: 1280px;

		--border-radius: 1rem;

		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		gap: 0.5rem;

		width: fit-content;
		min-width: 16rem;
		max-width: var(--max-width);

		margin: 0 auto;
		padding: var(--padding);
	}

	.info {
		display: flex;
		flex-direction: column;

		gap: 0.25rem;
		width: 100%;
		padding: 1rem;

		border-radius: var(--border-radius);
		background-color: var(--color-surface-1);
	}

	.info h2 {
		margin: 0;

		font-size: 1.5rem;
		font-weight: 300;
		line-height: 1.75rem;

		max-width: 36rem;
	}

	.details {
		display: flex;
		align-items: center;
		justify-content: space-between;

		font-weight: 200;
	}

	.details p {
		margin: 0;
	}

	img {
		display: block;

		max-width: 100%;
		max-height: 100%;

		object-fit: contain;
		object-position: center;
	}

	.image-fullscreen {
		display: flex;
		align-items: center;
		justify-content: center;

		cursor: pointer;

		width: 100%;
		padding: 0;
		margin: 0;

		border: none;
		border-radius: var(--border-radius);

		background-color: var(--color-surface-1);
		overflow: hidden;

		transition: border-radius 200ms ease 100ms, box-shadow 200ms ease;
	}

	.image-fullscreen:hover {
		border-radius: 0.5rem;
		box-shadow: 0 0 0 2px var(--color-primary);
	}

	@media (min-width: 470px) {
		.container {
			gap: 0.75rem;
			padding: 0.75rem;
		}

		img {
			max-height: 85vh;
		}
	}

	@keyframes test {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
