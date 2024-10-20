<script>
    import { conf } from '$lib/config'

    let title = conf.title || ''
    let description = conf.description || ''
</script> 

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}>
</svelte:head>
