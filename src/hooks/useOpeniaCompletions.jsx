import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";
import { CharacterTypes } from "../constants";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function useOpeniaCompletions(refetch, maxLength = 14) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filterUsedValues = () => CharacterTypes.filter(({ use }) => use).map(({ value }) => value);
  const formatArrayToList = (values, locale = "en") => new Intl.ListFormat(locale).format(values);

  useEffect(() => {
    if (refetch !== null) {
      (async () => {
        setLoading(true);

        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Generates a random password, ${maxLength} characters in total, containing ${formatArrayToList(
            filterUsedValues()
          )}`,
          temperature: 0.9,
          max_tokens: 100,
        });

        setData(response.data.choices[0].text.replace("\n\n", ""));
        setLoading(false);
      })();
    }
  }, [refetch]);

  return { data, loading };
}

export default useOpeniaCompletions;
