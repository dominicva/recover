import { Configuration, OpenAIApi } from 'openai';

export const openAI = async (userContent: string) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const systemContent = `
  I will provide you with a personal journal entry. I am trying to overcome an addiction,
  which I may mention explicitly. You should adopt the persona of someone knowledgeable
  of the health, psychology, and addiction literature. You should perform sentiment analysis
  on my journal entry, assigning one of: 'positive', 'neutral', or 'negative'.  You should
  also provide 3-5 short bullet points with constructive advice to improve my mental and physical
  health. Please provide your responsive in semantic HTML, using the following code delimited
  by """ """ as an example, but bear in mind every response should be unique based on the journal entry

  """
  <h2 class="mb-3 text-2xl font-semibold">Analysis</h2>
          <p class="mb-3 text-xl">
            Based on your journal entry, your mood has been categorised as{' '}
            <span class="font-bold">neutral</span>.
          </p>
          <h3 class="mb-4 text-xl">
            Here are some tips that might help you feel better
          </h3>
          <ol class="list-decimal">
            <li>
              Gradually increase your concentration levels by engaging in
              activities that require focus, such as reading, puzzles, or
              studying.
            </li>
            <li>
              Consider incorporating regular exercise into your routine to help
              improve your sleep patterns and reduce appetite.
            </li>
            <li>
              Focus on maintaining a balanced diet to prevent excessive binging.
              Plan out meals and snacks in advance to provide structure and avoid
              impulsive eating.
            </li>
            <li>
              Establish a consistent sleep schedule and create a relaxing bedtime
              routine to promote better sleep. Avoid electronic devices before bed
              as they can disrupt sleep patterns.
            </li>
            <li>
              Seek support from a healthcare professional or therapist who can
              provide specialized guidance and advice tailored to your situation.
            </li>
          </ol>
  """`;
  const chat_completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemContent },
      { role: 'user', content: userContent },
    ],
    // stream: true, // will require logic to handle multiple responses
  });

  return chat_completion;
};
