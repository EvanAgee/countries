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
  borders: string[];
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

export const getCountry = async (name: string): Promise<Country> => {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const [country] = await response.json();
  return country;
};
