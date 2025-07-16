//connverts speech to text using the Wishper API
import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function speechToText(audioFile) {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFile),
      model: "gpt-4o-mini-transcribe",
    });
    return transcription.text;
  } catch (error) {
    console.error("Error converting speech to text:", error);
    throw new Error("Failed to convert speech to text");
  }
}
export default speechToText;
