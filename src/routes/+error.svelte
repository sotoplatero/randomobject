<script lang="ts">
	import { page } from '$app/stores';
</script>


<h1 class="text-2xl sm:text-5xl">{$page.status}: {$page.error.message}</h1>
{#if $page.status === 404}
    <p>
        Oops, it seems the page you're looking for is lost.
    </p>
{:else}
    <p>
        Something went wrong but remember that even in times of trouble, there's strength to be found.
    </p>
{/if}

<a href="/" class="btn primary mt-16">Back to Home</a>