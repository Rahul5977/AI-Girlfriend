import classify from "./node/classify.js";
import sweet from "./node/sweet.js";
import romantic from "./node/romantic.js";
import rude from "./node/rude.js";
import { chatModel } from "../langchain/model.js";

import {
  Annotation,
  messagesStateReducer,
  START,
  END,
  StateGraph,
} from "@langchain/langgraph";

// 1. Define State Schema
const GraphState = Annotation.Root({
  input: Annotation.String(),
  emotion: Annotation.String().optional(),
  messages: Annotation({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  response: Annotation.String().optional(),
  userId: Annotation.String().optional(),
  history: Annotation.Array(Annotation.Any()).optional(),
});
// 2. Define State Graph
const graph = new StateGraph({
  channels: GraphState,
  name: "AI Girlfriend",
  description: "A chatbot that responds based on the user's input tone.",
});
// 3. Define nodes
graph.addNode({
  id: "classify",
  name: "Classify Tone",
  description:
    "Classifies the user's message tone as 'sweet', 'rude', or 'romantic'.",
  input: { input: GraphState.input },
  output: { emotion: GraphState.emotion, input: GraphState.input },
  run: classify,
});
graph.addNode({
  id: "sweet",
  name: "Sweet Response",
  description: "Generates a sweet response based on the user's input.",
  input: { input: GraphState.input },
  output: { response: GraphState.response },
  run: sweet,
});
graph.addNode({
  id: "romantic",
  name: "Romantic Response",
  description: "Generates a romantic response based on the user's input.",
  input: { input: GraphState.input },
  output: { response: GraphState.response },
  run: romantic,
});
graph.addNode({
  id: "rude",
  name: "Rude Response",
  description: "Generates a rude response based on the user's input.",
  input: { input: GraphState.input },
  output: { response: GraphState.response },
  run: rude,
});
// 4. Define Edges
graph.addEdge({
  from: START,
  to: "classify",
  input: { input: GraphState.input },
  output: { emotion: GraphState.emotion, input: GraphState.input },
});
graph.addEdge({
  from: "classify",
  to: "sweet",
  condition: (state) => state.emotion === "sweet",
  input: { input: GraphState.input },
  output: { response: GraphState.response },
});
graph.addEdge({
  from: "classify",
  to: "romantic",
  condition: (state) => state.emotion === "romantic",
  input: { input: GraphState.input },
  output: { response: GraphState.response },
});
graph.addEdge({
  from: "classify",
  to: "rude",
  condition: (state) => state.emotion === "rude",
  input: { input: GraphState.input },
  output: { response: GraphState.response },
});
// 5. Define End Node
graph.addEdge({ from: "sweet", to: END });
graph.addEdge({ from: "romantic", to: END });
graph.addEdge({ from: "rude", to: END });
//compile the graph
const compiledGraph = graph.compile({
  input: GraphState.input,
  emotion: GraphState.emotion,
  response: GraphState.response,
  messages: GraphState.messages,
});
// 6. Export the graph
export { compiledGraph as graph, GraphState };
