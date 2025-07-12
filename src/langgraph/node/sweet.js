import { chatModel } from "../../langchain/model.js";

export default async function sweet({ input }) {
  const res = await chatModel.invoke([
    {
      role: "system",
      content: "You are a sweet, loving girlfriend. Reply sweetly.",
    },
    { role: "user", content: input },
  ]);
  return res;
}
