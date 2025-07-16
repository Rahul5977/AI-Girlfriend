import { graph } from "../langgraph/index.js";
import speechToText from "../utils/stt.js";
import textToSpeech from "../utils/tts.js";

export const chatHandler = async (req, res) => {
  try {
    const { audioFile } = req.body;
    if (!audioFile) {
      return res.status(400).json({ error: "Audio file is required" });
    }
    const userId = req.user.id || "guest";
    const userInput = await speechToText(audioFile);
    if (!userInput) {
      return res.status(400).json({ error: "Failed to convert audio to text" });
    }
    console.log(`User Input: ${userInput}`);
    // sending this userInput to langgraph node
    const stream = await graph.stream({ userId, input: userInput });
    let responses = [];
    let audioFiles = [];
    let count = 1;

    for await (const state of stream) {
      if (state.response) {
        responses.push(state.response);
        const audioPath = await textToSpeech(
          state.response,
          `${userId}_${count}`
        );
        audioFiles.push(`/audio/${path.basename(audioPath)}`);
        count++;
      }
    }
    res.status(200).json({
      userText: userInput,
      aiText: responses,
      audioFiles: audioFiles,
      message: "Chat processed successfully",
    });
  } catch (error) {
    console.error("Error in chatHandler:", error);
    res.status(500).json({ error: "Internal server error in chatHandler" });
  }
};
