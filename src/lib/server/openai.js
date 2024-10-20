import { OPENAI_API_KEY } from "$env/static/private";
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });


export async function chat(input, system) {

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system},
        { role: 'user', content: input }
      ],
    });

    const content = response?.choices[0]?.message?.content?.trim() ?? '[]';
    // console.log(content)
    return JSON.parse(content);
  }
