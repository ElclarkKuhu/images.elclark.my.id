<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container">
	<img src={data.image} alt="User Uploaded" />
	<header>
		<a href="/" class="on-background-text">
			<h1>
				<span class="font-medium primary-text">Elclark</span> images
			</h1>
		</a>

		<div class="buttons">
			<button type="button" class="icon-button"
				><span class="material-symbols-rounded">assignment</span></button
			>
			<button type="button" class="share">Share</button>
		</div>

		<button type="button" class="more icon-button">
			<span class="material-symbols-rounded">more_vert</span>
		</button>
	</header>
</div>

<style>
	.container {
		--max-width: 1280px;
		--border-radius: 2.5rem;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		gap: 1rem;
		margin: 0 auto;
		padding: 1rem;

		min-height: 100vh;
		max-width: var(--max-width);
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		width: 100%;
		height: 4.5rem;
		padding: 0 1.5rem;

		border-radius: var(--border-radius);
		background-color: var(--color-surface-2);
	}

	h1 {
		margin: 0;

		font-weight: 300;
		font-size: var(--typescale-headline-small-font-size);
		line-height: var(--typescale-headline-small-line-height);
	}

	img {
		width: 100%;
		height: 100%;

		min-height: 42rem;

		cursor: pointer;
		object-fit: contain;
		object-position: center;

		border-radius: var(--border-radius);

		background-color: var(--color-surface-2);
		transition: border-radius 200ms ease 200ms, box-shadow 200ms ease;
	}

	img:hover {
		border-radius: 0.5rem;
		box-shadow: 0 0 0 3px var(--color-primary);
	}

	.more {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.buttons {
		display: flex;
		gap: 0.75rem;
	}

	.icon-button {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 2.75rem;
		height: 2.75rem;

		font: inherit;
		border: none;
		font-weight: 500;
		border-radius: var(--border-radius);

		color: var(--color-on-background);
		background-color: transparent;

		cursor: pointer;

		transition: background-color 100ms ease;
	}

	.icon-button:hover {
		color: var(--color-primary);
		background-color: var(--color-surface-2);
	}

	.share {
		display: flex;
		align-items: center;
		justify-content: center;

		font: inherit;
		border: none;
		border-radius: var(--border-radius);

		height: 2.75rem;
		padding: 0 1.75rem;
		font-weight: 500;

		color: var(--color-on-background);
		background-color: var(--color-surface-2);

		cursor: pointer;
	}

	.share:hover {
		color: var(--color-primary);
		background-color: var(--color-surface-4);
	}

	h1 span {
		border-radius: 0.25rem;

		background: linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) 100%);
		background-position: 0% 100%;
		background-repeat: no-repeat;
		background-size: 0% 100%;

		transition: background-size 200ms ease, color 200ms ease, padding 200ms ease;
	}

	a:hover h1 span {
		padding: 0 0.5rem;
		color: var(--color-on-primary);
		background-size: 100% 100%;
	}

	@media (min-width: 470px) {
		h1 {
			font-size: var(--typescale-headline-medium-font-size);
			line-height: var(--typescale-headline-medium-line-height);
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
