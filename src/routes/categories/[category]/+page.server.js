import { chat } from '$lib/server/openai';
import { categories } from '$lib/categories.js';
import { error } from '@sveltejs/kit';

async function generateObjects(category) {

    const categoryInfo = categories.find(c => c.id === category);

    if (!categoryInfo) {
        throw error(404, 'Category not found');
    }
    const categoryName = categoryInfo.name;
    const system = `You are a random object generator specializing in ${categoryName}. Always respond with a valid JSON array containing four objects.`;
    const input = `Generate four random objects related to ${categoryName}, each with a name and optionally a description. Return a JSON array with exactly four objects in this format: [{\"name\":\"object1 name\",\"description\":\"object1 description (optional)\"},...]. No including code blocks or other formatting.`;

    return await chat(input, system);
}

export const actions = {
    default: async ({ params }) => {
        try {
            const objects = await generateObjects(params.category);
            return { success: true, randomObjects: objects };
        } catch (err) {
            console.error('Server action error:', err);
            return { success: false, error: err.message };
        }
    }
};

export async function load({ params }) {
    
    const category = params.category;
    const categoryInfo = categories.find(c => c.id === category);

    if (!categoryInfo) {
        throw error(404, 'Category not found');
    }

    const objects = await generateObjects(category);

    return { 
        randomObjects: objects, 
        category: category,
        categoryName: categoryInfo.name
    };
}
