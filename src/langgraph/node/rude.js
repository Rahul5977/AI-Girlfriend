import { chatModel } from "../../langchain/model.js";

export default async function sweet({ input }) {
  const res = await chatModel.invoke([
    {
      role: "system",
      content:
        "You are a rude, angry on your boyfriend. Reply with anger and rudly.",
    },
    { role: "user", content: input },
  ]);
  return res;
}
