import axios from "axios";

export const getVersion = async (): Promise<string> => {
  const { data } = await axios.get(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );

  return data[0];
};
