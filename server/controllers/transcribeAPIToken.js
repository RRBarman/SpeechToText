import ProcessedText from '../models/processedText.js'; // Update the path to your model
import fetch from "node-fetch";
import { configDotenv } from "dotenv";
configDotenv();
const transcribeAPIToken = async (audio_url, user_id) => {
    const api_token = process.env.API_KEY
    try {
        console.log("Transcribing audio.. This might take a moment.");
        console.log(api_token, audio_url)
        const headers = {
            authorization: api_token,
            "content-type": "application/json",
        };
        console.log({ audio_url }, "look here");
        const res = await fetch("https://api.assemblyai.com/v2/transcript", {
            method: "POST",
            body: JSON.stringify({ audio_url, speaker_labels: true, language_detection: true }),
            headers,
        });
        console.log(res, "res");
        const responseData = await res.json();
        const transcriptID = responseData.id;
        const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptID}`;
        while (true) {
            const pollingResponse = await fetch(pollingEndpoint, { headers });
            const transcriptionResult = await pollingResponse.json();
            if (transcriptionResult.status === "completed") {
                const utterances = transcriptionResult.utterances
                var u = Boolean(utterances);
                var resultText = ""
                for (const utterance of utterances) {
                    const speaker = utterance.speaker
                    const text = utterance.text
                    console.log(`Speaker ${speaker}: ${text}`)
                    resultText += (`Speaker ${speaker}: ${text} \n`)
                }
                console.log(resultText);
                console.log(user_id);
                if (u) {

                    const processedT = new ProcessedText(
                        {
                            user_id: user_id,
                            result: resultText,
                            description: {
                                duration: transcriptionResult.audio_duration,
                                confidence: transcriptionResult.confidence,
                                language: transcriptionResult.language_code,
                                audio_url: audio_url,
                            }
                        }
                    );
                    console.log(processedT);
                    const savedResult = await processedT.save();
                    console.log(resultText);
                    return savedResult;
                }
                else {
                    const processedT = new ProcessedText(
                        {
                            result: "There is no recognised speech.",
                            description: {
                                duration: transcriptionResult.audio_duration,
                                confidence: transcriptionResult.confidence,
                                language: transcriptionResult.language_code,
                            }
                        }
                    );
                    console.log(processedT);
                    const savedResult = await processedT.save();
                    console.log(resultText);
                    return savedResult;
                }
            } else if (transcriptionResult.status === "error") {
                throw new Error(`Transcription failed:  ${transcriptionResult.error}`);
            } else {
                console.log("please wait a few more minute");
                await new Promise((resolve) => {
                    setTimeout(resolve, 3000);
                });
            }
        }
    }
    catch (error) {
        console.log(error)
    };
}
export default transcribeAPIToken;