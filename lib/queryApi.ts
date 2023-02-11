import openai from "./ChatGpt";

const query = async (prompt: string, ChatID: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `ChatGPt was unable to find an answer for that!! (Error: ${err.message})`
    );


    return res;
};

export default query
