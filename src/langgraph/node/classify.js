import { chatModel } from "../../langchain/model.js";
export default async function classify({ input }) {
  const response = await chatModel.invoke([
    {
      role: "system",
      content:
        "Classify the user's message tone as 'sweet', 'rude', or 'romantic'. Return only one word.",
    },
    {
      role: "user",
      content: input,
    },
  ]);
  return { emotion: response.content.trim().toLowerCase(), input };
}
