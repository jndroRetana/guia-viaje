import { streamText, generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { prompts } from "./prompts";

const apiKey = sessionStorage.getItem("apiKey");

const openaiObject = (apiKey) =>
  createOpenAI({
    apiKey,
  });

export const textStream = async (
  city: string,
  promptName: string = "getSuggestionsPlaces",
  loader: HTMLElement,
  apiKey: string
) => {
  const openai = openaiObject(apiKey);
  try {
    const result = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompts[promptName](city),
    });

    return result.text;
  } catch (error) {
    loader.style.display = "none";
    return promptName === "getSuggestionsPlaces" ? "{}" : "[]";
  }
};

export const infoPlace = async (
  city: string,
  promptName: string = "getSuggestionsPlaces",
  loader: HTMLElement,
  apiKey: string
) => {
  const openai = openaiObject(apiKey);
  try {
    const result = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompts[promptName](city),
    });

    return result.text;
  } catch (error) {
    loader.style.display = "none";
    return error.toString();
  }
};

export const textItinerary = async (
  city: string,
  places: string,
  promptName: string = "getSuggestionsPlaces",
  loader: HTMLElement,
  apiKey: string
) => {
  const openai = openaiObject(apiKey);
  try {
    const result = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompts[promptName](city, places),
    });

    const itinerary = document.querySelector("#itinerary");
    itinerary.innerHTML = "";
    const test = [];
    itinerary.innerHTML += result.text;
  } catch (error) {
    loader.style.display = "none";
  }
};
