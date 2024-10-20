<script>
    import { page } from '$app/stores';
    import { categories } from '$lib/categories.js';

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    $: currentPath = $page.url.pathname;
</script>

<header class="text-gray-800 ">
    <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between items-center py-4">
            <div class="flex items-center">
                <a href="/" class="text-2xl font-bold flex items-center">
                    <span class="text-3xl mr-2" aria-hidden="true">🔮</span>
                    RandomObject
                </a>
            </div>
            <nav class="hidden md:flex space-x-4">
                <a href="/categories" class="hover:text-gray-300 {currentPath === '/categories' ? 'underline' : ''}">Categories</a>
                <a href="/contact" class="hover:text-gray-300 {currentPath === '/contact' ? 'underline' : ''}">Contact</a>
            </nav>
            <button class="md:hidden" on:click={toggleMenu}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
    </div>
    {#if isMenuOpen}
        <div class="md:hidden">
            <nav class="px-2 pt-2 pb-4 space-y-1">
                <a href="/" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white {currentPath === '/' ? 'bg-gray-900 text-white' : 'text-gray-300'}">Home</a>
                <a href="/categories" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white {currentPath === '/categories' ? 'bg-gray-900 text-white' : 'text-gray-300'}">Categories</a>
                <a href="/contact" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white {currentPath === '/contact' ? 'bg-gray-900 text-white' : 'text-gray-300'}">Contact</a>
            </nav>
        </div>
    {/if}
</header>
