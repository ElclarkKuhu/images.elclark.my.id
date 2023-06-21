<script lang="ts">
	export let text: string;
	export let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
</script>

<span
	aria-label={text}
	class:place-top={placement === 'top'}
	class:place-bottom={placement === 'bottom'}
	class:place-left={placement === 'left'}
	class:place-right={placement === 'right'}
>
	<slot />
</span>

<style>
	span {
		width: 100%;

		display: block;
		position: relative;
	}

	span::before {
		content: attr(aria-label);

		position: absolute;
		font-weight: 400;
		text-transform: capitalize;

		width: max-content;
		margin: 0.5rem 0;
		padding: 0.25rem 0.75rem;

		border-radius: 2.5rem;
		pointer-events: none;

		color: var(--color-on-primary-container);
		background-color: var(--color-primary-container);

		opacity: 0;

		transition: opacity 200ms ease-in-out;
	}

	.place-top::before {
		top: unset;
		left: 50%;
		right: unset;
		bottom: 100%;
		transform: translateX(-50%);
	}

	.place-bottom::before {
		top: 100%;
		left: 50%;
		right: unset;
		bottom: unset;
		transform: translateX(-50%);
	}

	.place-left::before {
		top: 50%;
		left: unset;
		right: 100%;
		bottom: unset;
		transform: translateY(-50%);

		margin: 0 0.25rem;
	}

	.place-right::before {
		top: 50%;
		left: 100%;
		right: unset;
		bottom: unset;
		transform: translateY(-50%);

		margin: 0 0.25rem;
	}

	span:hover::before {
		opacity: 1;
	}
</style>
