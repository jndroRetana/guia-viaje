const url = "https://google-api31.p.rapidapi.com/imagesearch";

const createOptions = (text: string) => {
  return {
    method: "POST",
    headers: {
      "x-rapidapi-key": "551165212dmsh52ad8b5affeb18dp1445bdjsn4f03af29adc9",
      "x-rapidapi-host": "google-api31.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      safesearch: "off",
      region: "wt-wt",
      color: "",
      size: "",
      type_image: "",
      layout: "",
      max_results: 1,
    }),
  };
};

export const getImage = async (text: string) => {
  const options = createOptions(text);
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const dataImage =
      result.result?.length > 0
        ? { image: result.result[0].image, alt: result.result[0].title }
        : { image: "", alt: "" };

    return dataImage;
  } catch (error) {
    console.error(error);

    return { image: "", alt: "" };

  }
};
