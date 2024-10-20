<script>
    import CategoryList from '$lib/components/CategoryList.svelte';
</script>

<svelte:head>
    <title>Categories - RandomObject Generator</title>
    <meta name="description" content="Choose a category to generate random objects from specific themes.">
</svelte:head>

<main class="max-w-3xl mx-auto p-6">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">
        Random Object Categories
    </h1>

    <CategoryList columns={2} />

    <section class="mt-12">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">How to Use Categories</h2>
        <p class="text-gray-600 text-center mb-4">
            Click on any category to generate random objects specific to that theme. Each category offers unique and inspiring items to fuel your creativity.
        </p>
        <p class="text-gray-600 text-center">
            Whether you're looking for writing prompts, design inspiration, or just want to explore interesting objects, our categories have something for everyone!
        </p>
    </section>
</main>
