<script>
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';

    export let category = '';
    export let initialObjects = [];

    let objectQueue = [];
    let currentObject = null;
    let isLoading = false;
    let objectImage = null;
    let photographer = null;
    let imagePageUrl = null;

    function addObjectsToQueue(objects) {
        objectQueue = [...objectQueue, ...objects];
    }

    function getNextObject() {
        if (objectQueue.length > 0) {
            currentObject = objectQueue.shift();
            if (objectQueue.length === 2) {
                requestNewObjects();
            }
        }
    }

    function requestNewObjects() {
        if (!isLoading) {
            isLoading = true;
            document.getElementById('generateForm').requestSubmit();
        }
    }

    function handleObjectClick() {
        getNextObject();
    }

    function handleSubmit() {
        return async ({ result }) => {
            if (result.type === 'success') {
                addObjectsToQueue(result.data.randomObjects);
            }
            isLoading = false;
        };
    }

    async function fetchObjectImage(objectName) {
        try {
            const response = await fetch(`/api/image-search?q=${encodeURIComponent(objectName)}`);
            const data = await response.json();
            if (data.imageUrl) {
                objectImage = data.imageUrl;
                photographer = data.photographer;
                imagePageUrl = data.pageUrl;
            } else {
                objectImage = null;
                photographer = null;
                imagePageUrl = null;
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            objectImage = null;
            photographer = null;
            imagePageUrl = null;
        }
    }

    $: if (currentObject) {
        fetchObjectImage(currentObject.name);
    }

    onMount(() => {
        addObjectsToQueue(initialObjects);
        if (objectQueue.length === 0) {
            requestNewObjects();
        } else {
            getNextObject();
        }
    });
</script>

<div class="relative mb-8">
    <button 
        on:click={handleObjectClick}
        class="absolute top-3 right-3 z-40 btn btn-success btn-circle bg-green-500 text-white shadow-lg hover:bg-green-600 transition duration-300"
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
    </button>

    <form method="POST" use:enhance={handleSubmit} id="generateForm" class="hidden">
        <input type="hidden" name="category" value={category}>
    </form>

    <article 
        on:click={handleObjectClick}
        class="bg-gray-100 p-16 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300 relative"
    >
        {#if objectImage}
        <div class="aspect-video overflow-hidden mb-4">
            <img src={objectImage} alt={currentObject?.name} class="mx-auto aspect-video object-cover max-w-full h-auto rounded-lg shadow-lg" />
        </div>
        <p class="text-sm text-center text-gray-500 mb-4">
            Photo by <a href={imagePageUrl} target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">{photographer}</a> on Pixabay
        </p>
        {:else}
        <p class="text-center text-gray-500 mb-4">No image available</p>
        {/if}
        <h2 class="text-7xl font-extrabold text-center mb-4 gradient-text">{currentObject?.name}</h2>
        <p class="text-sm text-center text-gray-600 mt-4">{currentObject?.description}</p>
    </article>
</div>

<style>
    .gradient-text {
        background: linear-gradient(45deg, #FF1493, #00BFFF, #FF4500, #1E90FF);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: gradient 8s ease infinite;
        background-size: 300% 300%;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
</style>
