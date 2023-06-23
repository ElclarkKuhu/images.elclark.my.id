<script lang="ts">
	import Tooltip from '$lib/tooltip.svelte';

	export let image: string;

	function clipboard() {
		const href = window.location.href;

		if (href) {
			navigator.clipboard.writeText(href);
			// TODO: add a toast to show that the link has been copied
		}
	}
</script>

<header>
	<a href="/" class="on-background-text">
		<h1>
			<span class="font-medium primary-text">Elclark</span> images
		</h1>
	</a>

	<div class="buttons">
		<div class="icon-buttons">
			<Tooltip text="Static Link" placement="bottom">
				<a href={image} class="icon-button" target="_blank">
					<span class="material-symbols-rounded">captive_portal</span>
				</a>
			</Tooltip>
			<Tooltip text="Copy Link" placement="bottom">
				<button type="button" class="icon-button" on:click={clipboard}>
					<span class="material-symbols-rounded">assignment</span>
				</button>
			</Tooltip>
		</div>
		<button type="button" class="button share">Share</button>
		<button type="button" class="icon-button share-icon">
			<span class="material-symbols-rounded">share</span>
		</button>
	</div>

	<button type="button" class="more icon-button">
		<span class="material-symbols-rounded">read_more</span>
	</button>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		container-type: inline-size;

		width: 100%;
		padding: 0.5rem 0.5rem;

		border-radius: var(--border-radius);
		background-color: var(--color-surface-2);
	}

	h1 {
		margin: 0 0.5rem;

		font-weight: 300;
		font-size: 1.25rem;
		line-height: 1.25rem;
	}

	.more {
		display: flex;
	}

	.buttons {
		display: none;
	}

	.icon-buttons {
		display: flex;
	}

	.icon-button {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 2.5rem;
		height: 2.5rem;

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

	.button {
		display: flex;
		align-items: center;
		justify-content: center;

		font: inherit;
		border: none;
		border-radius: 0.75rem;

		height: 2.75rem;
		padding: 0 1.75rem;
		font-weight: 500;

		color: var(--color-on-background);
		background-color: var(--color-surface-2);

		cursor: pointer;
	}

	.button:hover {
		color: var(--color-primary);
		background-color: var(--color-surface-4);
	}

	.share-icon {
		display: flex;
	}

	.share {
		display: none;
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

	@container (min-width: 350px) {
		.buttons {
			display: flex;
		}

		.more {
			display: none;
		}
	}

	@container (min-width: 420px) {
		.share {
			display: flex;
		}

		.share-icon {
			display: none;
		}

		.buttons {
			gap: 0.5rem;
		}

		.header {
			padding: 0.5rem 1rem;
		}

		h1 {
			font-size: 28px;
			line-height: 36px;
		}

		.icon-button {
			width: 2.75rem;
			height: 2.75rem;
		}
	}
</style>
