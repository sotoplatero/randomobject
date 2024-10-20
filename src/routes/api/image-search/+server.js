import { PIXABAY_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    const query = url.searchParams.get('q');
    if (!query) {
        return json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const searchUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=3`;

    try {
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
            // Filtrar imágenes horizontales (ancho > alto)
            const horizontalImages = data.hits.filter(img => img.imageWidth > img.imageHeight);
            
            if (horizontalImages.length > 0) {
                // Seleccionar una imagen aleatoria de las horizontales
                const randomIndex = Math.floor(Math.random() * horizontalImages.length);
                const selectedImage = horizontalImages[randomIndex];
                return json({ 
                    imageUrl: selectedImage.webformatURL,
                    photographer: selectedImage.user,
                    pageUrl: selectedImage.pageURL
                });
            }
        }
        
        return json({ error: 'No suitable horizontal image found' }, { status: 404 });
    } catch (error) {
        console.error('Error fetching image:', error);
        return json({ error: 'Failed to fetch image' }, { status: 500 });
    }
}
