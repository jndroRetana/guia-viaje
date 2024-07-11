import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { prompts, goToLocations, replaceCaracteres } from "../index";

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
  apiKey: string,
  locations: any,
  goToTest: any
) => {
  const openai = openaiObject(apiKey);
  try {
    const result = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompts[promptName](city, places),
    });

    const itinerary = document.querySelector("#itinerary");
    itinerary.innerHTML = "";
    itinerary.innerHTML += result.text;
    const test = document.querySelectorAll(".namePlace");

    test.forEach((element) => {
      element.addEventListener("click", (e) => {
        const targetElement = e.target as HTMLElement;
        const keyObjet = targetElement.textContent.replace(/ /g, "_");
        const { longitud, latitud } = locations[keyObjet];
        goToLocations(
          {
            target: [longitud, latitud],
            zoom: 18,
          },
          {
            animationMode: "always",
          }
        );
      });
    });
  } catch (error) {
    loader.style.display = "none";
  }
};

export const validateTextCity = async (
  apiKey,
  promptName = "getValidateNameCity",
  location
) => {
  const openai = openaiObject(apiKey);
  try {
    const result = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: prompts[promptName](location),
    });

    return replaceCaracteres(result.text).toLowerCase();
  } catch (error) {
    return error.toString();
  }
};
