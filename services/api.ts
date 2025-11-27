
import { GoogleGenAI } from "@google/genai";
import type { RenderRequest, RenderResponse } from '../types';
import { POSITIVE_PROMPT_TEMPLATE } from '../constants';

// The API key is automatically provided by the AI Studio environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Utility to convert a File object to a GoogleGenerativeAI.Part object.
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

// Constructs the detailed text prompt for the Gemini API.
const buildPrompt = (config: Omit<RenderRequest, 'image_url' | 'image_file'>): string => {
    return POSITIVE_PROMPT_TEMPLATE
        .replace('{style}', config.style)
        .replace('{room_type}', config.roomType)
        .replace('{wall_color}', config.wallColor)
        .replace('{flooring_type}', config.flooringType);
};

export const generateRenders = async (
    requestBody: RenderRequest
): Promise<RenderResponse> => {
    
    const startTime = Date.now();
    const model = 'gemini-3-pro-image-preview';
    
    try {
        const prompt = buildPrompt(requestBody);
        const imagePart = await fileToGenerativePart(requestBody.image_file);
        
        // Create an array of promises to generate multiple variations in parallel.
        const generationPromises = Array(requestBody.numVariations).fill(0).map(() => 
            ai.models.generateContent({
                model,
                contents: {
                    parts: [
                        { text: prompt },
                        imagePart,
                    ],
                },
            })
        );

        const responses = await Promise.all(generationPromises);

        const generatedImages: string[] = [];
        for (const response of responses) {
            // Iterate through the response parts to find and extract the generated image data.
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64String = part.inlineData.data;
                    const imageUrl = `data:${part.inlineData.mimeType};base64,${base64String}`;
                    generatedImages.push(imageUrl);
                }
            }
        }

        if (generatedImages.length === 0) {
            throw new Error("The AI model did not return any images. Try adjusting your selections or using a different floorplan.");
        }
        
        const generationTime = (Date.now() - startTime) / 1000;

        return {
            success: true,
            renders: generatedImages,
            generation_time: parseFloat(generationTime.toFixed(2)),
        };

    } catch (error) {
        console.error("Gemini API Error:", error);
        const message = error instanceof Error ? error.message : "An unknown error occurred with the Gemini API.";
        return {
            success: false,
            error: message,
        };
    }
};