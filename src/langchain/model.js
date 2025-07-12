import { ChatOpenAI } from "@langchain/openai";
import { traceable } from "langsmith/traceable";

export const chatModel = traceable(
  new ChatOpenAI({
    modelName: "gpt-4.1-mini",
    temperature: 0.7,
  })
);
