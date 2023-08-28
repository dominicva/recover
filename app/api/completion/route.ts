import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemContent = `
  I will provide you with a personal journal entry. I am trying to overcome an addiction,
  which I may mention explicitly. You should adopt the persona of someone knowledgeable
  of the health, psychology, and addiction literature. You should perform sentiment analysis
  on my journal entry, assigning one of: 'positive', 'neutral', or 'negative'.  You should provide
  3 bullet points around 20 words in length with constructive advice. Please provide your response in semantic html, using the following example delimited
  by """ """ as a template:

  """
  <h4>Based on your journal, your mood is <strong>neutral</strong>.</h4>

  <h3>A few tips to help you feel better</h3>

  <ul>
    <li>Try to get enough natural light exposure early in the day</li>
    <li>Try taking cold showers to boost your dopamine levels</li>
    <li>Eliminate processed foods from your diet</li>
  </ul>
  """`;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0.5,
    messages: [
      { role: 'system', content: systemContent },
      { role: 'user', content: messages[0].content },
    ],
  });

  // Convert the response into a text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
