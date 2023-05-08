import React from "react";
import CountryCard from "@/components/Country/CountryCard";
import PageTransition from "@/components/PageTransition";
import { Country } from "@/services/CountryService";

interface IHomeProps {
  countries: Country[] | null;
}

export default function Home({ countries }: IHomeProps) {
  const [search, setSearch] = React.useState("");
  const [regionFilter, setRegionFilter] = React.useState("");

  const filteredCountries = React.useMemo(() => {
    if (!search && !regionFilter) return countries;

    return countries
      ?.filter((country) => {
        if (!search) return true;
        return [country.name.common, country.name.official]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      })
      .filter((country) => {
        if (!regionFilter) return true;
        return country.region === regionFilter;
      })
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  }, [search, countries, regionFilter]);

  const regions = React.useMemo(() => {
    const unique = [...new Set(countries?.map((country) => country.region))];

    return unique.sort((a, b) => a.localeCompare(b));
  }, [countries]);

  console.log({ filteredCountries });

  return (
    <PageTransition>
      <div className="flex justify-between mb-12 relative">
        <div className="w-full text-black dark:text-white flex items-center gap-6">
          <input
            type="search"
            placeholder="Search for a country..."
            className="bg-white shadow-sm pl-16 max-w-[480px]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-8 top-1/2 transform -translate-y-1/2"
          >
            <g id="search">
              <path
                id="Shape"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z"
                fill="#848484"
              ></path>
            </g>
          </svg>
          <div>
            <strong>{filteredCountries?.length}</strong> Countries Found
          </div>
        </div>
        <div className="min-w-[200px]">
          <select
            className="w-full"
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="" key={10}>
              Filter by Region
            </option>
            {regions?.map((region, i) => (
              <option value={region} key={i}>
                {region} (
                {
                  countries?.filter((country) => country.region === region)
                    .length
                }
                )
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-24">
        {filteredCountries?.map((country, i) => (
          <CountryCard country={country} key={i} />
        ))}
      </div>
    </PageTransition>
  );
}

export const getServerSideProps = async () => {
  /**
   * Fields:
   * flags
   * name
   * capital
   * region
   * population
   */

  const countries =
    (await fetch(
      `https://restcountries.com/v3.1/all?fields=flags,name,capital,region,population`
    )) || null;

  return {
    props: {
      countries: await countries.json(),
    },
  };
};
