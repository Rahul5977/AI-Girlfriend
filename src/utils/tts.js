import fs from "fs";
import path from "path";
import { OpenAI } from "openai";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const textToSpeech = async (text, filenamePrefix = "output") => {
  try {
    const fileId = `${filenamePrefix}-${uuidv4()}.mp3`;
    const outputPath = path.join("public", "audio", fileId);

    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts", // or "tts-1-hd"
      voice: "nova",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);

    return outputPath;
  } catch (err) {
    console.error("TTS Error:", err);
    return null;
  }
};

export default textToSpeech;
