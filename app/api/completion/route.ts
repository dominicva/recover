import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, ReplicateStream, StreamingTextResponse } from 'ai';
import { prisma } from '@/lib/db';

export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: Request) {
  const { messages, journalEntryId } = await req.json();
  console.log('messages', messages);
  console.log('journalEntryId', journalEntryId);

  const systemContent = `
  I will provide you with a personal journal entry. I am trying to overcome an addiction,
  which I may mention explicitly. You should adopt the persona of someone knowledgeable
  of the health, psychology, and addiction literature. You should perform sentiment analysis
  on my journal entry, assigning one of: 'positive', 'neutral', or 'negative'.  You should provide
  3 bullet points around 20 words in length with constructive advice. Please provide your response in semantic HTML, using the following code delimited
  by """ """ as an example, but bear in mind every response should be unique based on the journal entry:

  """
  <h2 class="mb-3 text-2xl font-semibold">Analysis</h2>
          <p class="mb-3 text-xl">
            Your mood appears to be <span class="font-bold">neutral</span>.
          </p>
          <h3 class="mb-4 text-xl">
            A few tips to help you feel better
          </h3>
          <ul>
            <li>
              Make sure to get enough natural light exposure early in the day
            </li>
            <li>
              Exercise vigorosouly at least 3 times a week
            </li>
            <li>
              Make sure your bedroom is dark, quiet, and cool. Go to bed at the same time each night.
            </li>
            <li>
              Take cold showers to boost your dopamine levels
            </li>
            <li>
              Eliminate all processed foods from your diet
            </li>
          </ul>
  """`;

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
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
