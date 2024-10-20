import { OPENAI_API_KEY } from "$env/static/private";
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function chat(input, system) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: input }
            ],
            temperature: 1,
        });

        const content = response?.choices[0]?.message?.content?.trim() ?? '[]';
        console.log('Raw API response:', content);

        try {
            const parsedContent = JSON.parse(content);
            if (!Array.isArray(parsedContent) || parsedContent.length !== 4) {
                throw new Error('Expected an array with 4 objects');
            }
            return parsedContent;
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            console.error('Received content:', content);
            return Array(4).fill({ name: 'Error', description: 'Failed to parse API response' });
        }
    } catch (apiError) {
        console.error('API Error:', apiError);
        return Array(4).fill({ name: 'Error', description: 'Failed to fetch from API' });
    }
}
