<script>
    import { categories } from '$lib/categories.js';

</script>

<div class={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
    {#each categories as category}
        <a href={`/categories/${category.id}`}
            class="bg-gray-100 p-4 rounded-lg text-left hover:bg-gray-200 transition duration-300 flex items-center"
        >
            <span class="text-3xl mr-3" aria-hidden="true">{category.emoji}</span>
            <h2 class="text-xl font-bold">{category.name}</h2>
        </a>
    {/each}
</div>

