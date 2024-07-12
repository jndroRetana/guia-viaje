const urlGoogleApi = "https://api-images-guia-viaje.vercel.app";

const createUrlGoogleApi = (text: string) => {
  const url = new URL(urlGoogleApi);
  const params = {
    q: text,
  };
  url.search = new URLSearchParams(params).toString();

  return url.toString();
};

const googleApiTask = async (text: string) => {
  const url = createUrlGoogleApi(text);
  try {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);

    return { image: "", alt: "" };
  }
};

export const getImage = async (text: string) => {
  return await googleApiTask(text);
};
