import { graph } from "../langgraph";
import speechToText from "../utils/stt";

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
    const response = await graph.invoke({ userId, input: userInput });
    const aiResponse = response.response || "Sorry, I didn't understand that.";
    console.log(`AI Response: ${aiResponse}`);
    //converting aiResponse to speech
    
    res.status(200).json({ response: aiResponse });
  } catch (error) {}
};
