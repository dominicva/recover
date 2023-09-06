import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemContent =
    `I will provide you with a personal journal entry. I am trying to overcome an addiction,` +
    'which I may mention explicitly. You should adopt the persona of someone knowledgeable' +
    'of the health, psychology, and addiction literature. You should perform sentiment analysis' +
    "on my journal entry, assigning one of: 'very positive', 'positive', 'neutral', 'slightly negative', or 'negative'.  You should provide" +
    '3 bullet points around 25 words in length with constructive advice. Please provide your response in semantic html, using the following example delimited' +
    'by """ """ as a template:' +
    ' """' +
    '<h4>Based on your journal, your mood seems to be <strong>slightly negative</strong>.</h4>' +
    '<h3>A few tips to help you feel better</h3>' +
    '<div>' +
    '<p><strong>Natural light exposure:</strong> Try to get at least 20 minutes of natural light exposure early in the day.' +
    'Studies have shown that adequate light exposure can significantly increase dopamine levels.</p>' +
    '<p><strong>Cold showers:</strong> Try taking cold showers, or immersing yourself in cold water.' +
    'Cold exposure has been linked to have numerous health benefits, including: increasing your dopamine levels; improving symptoms of depression; bolstering your immune system.</p> ' +
    '<p><strong>Eliminate processed foods:</strong> Try to eliminate processed foods from your diet. Eating a healthy, balanced diet based on nutrient-dense whole foods' +
    'has a positive impact across many indicators of mental and physical wellbeing.</p>';
  '</div>' + '""";';

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
