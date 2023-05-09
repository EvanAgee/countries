export interface Country {
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
    official: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  area: number;
  borders?: string[] | undefined;
  fullBorders?: Country[] | undefined;
  flags: {
    svg: string;
    png: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  tld: string[];
  independent: boolean;
  status: string;
  unMember: boolean;
  cioc: string;
  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

export const getCountry = async (
  name: string,
  type: "name" | "code" = "name"
): Promise<Country> => {
  const response =
    type === "name"
      ? await fetch(`https://restcountries.com/v3.1/name/${name}`)
      : await fetch(`https://restcountries.com/v3.1/alpha/${name}`);
  const [country] = await response.json();
  return country;
};

export const getBorderCountries = async (
  country: Country
): Promise<Country> => {
  if (!country.borders) return country;
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(",")}`
  );
  const countries = await response.json();
  return {
    ...country,
    fullBorders: countries,
  };
};
