import { chat } from '$lib/server/openai';
import { categories } from '$lib/categories.js';

async function generateObjects(category) {
    const categoryName = categories.find(c => c.id === category)?.name || 'any category';
    const system = `You are a random object generator specializing in ${categoryName}. Always respond with a valid JSON array containing four objects.`;
    const input = `Generate four random objects related to ${categoryName}, each with a name and optionally a description. Return a JSON array with exactly four objects in this format: [{\"name\":\"object1 name\",\"description\":\"object1 description (optional)\"},...]. No including code blocks or other formatting.`;
    return await chat(input, system);
}

export const actions = {
    default: async ({ params }) => {
        const category = params.category || '';
        try {
            const objects = await generateObjects(category);
            return { success: true, randomObjects: objects };
        } catch (error) {
            console.error('Server action error:', error);
            return { success: false, error: error.message };
        }
    }
};

export async function load({ params }) {
    const category = params.category || '';
    const objects = await generateObjects(category);
    return { randomObjects: objects, category };
}
