import { chat } from '$lib/server/openai';

async function generateObjects() {
    const system = "You are a random object generator. Always respond with a valid JSON array containing four objects.";
    const input = "Generate four random objects existing in the real world, each with a name and optionally a description. Return a JSON array with exactly four objects in this format: [{\"name\":\"object1 name\",\"description\":\"object1 description (optional)\"},...]. No including code blocks or other formatting.";
    return await chat(input, system);
}

export const actions = {
    default: async () => {
        try {
            const objects = await generateObjects();
            return { success: true, randomObjects: objects };
        } catch (error) {
            console.error('Server action error:', error);
            return { success: false, error: error.message };
        }
    }
};

export async function load() {
    const objects = await generateObjects();
    return { randomObjects: objects };
}
