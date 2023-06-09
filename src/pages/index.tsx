import React from "react";
import CountryCard from "@/components/Country/CountryCard";
import PageTransition from "@/components/PageTransition";
import { Country } from "@/services/CountryService";
import classNames from "classnames";

interface IHomeProps {
  countries: Country[] | null;
}

export default function Home({ countries }: IHomeProps) {
  const [search, setSearch] = React.useState("");
  const [regionFilter, setRegionFilter] = React.useState("");
  const filteredCountries = React.useMemo(() => {
    // Filter the full list of countries based on search and region filter
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
    // Loop through countries and return an array of unique regions
    return countries
      ?.reduce((acc, country) => {
        if (!acc.includes(country.region)) acc.push(country.region);
        return acc;
      }, [] as string[])
      .sort((a, b) => a.localeCompare(b));
  }, [countries]);

  if (!countries)
    return (
      <div className="flex items-center justify-center">
        Unable to load countries from API.
      </div>
    );

  return (
    <PageTransition>
      <div className="flex lg:flex-row flex-col lg:justify-between mb-12 relative px-6">
        <div className="w-full text-black dark:text-white flex flex-col lg:flex-row items-center gap-6">
          <div className="relative w-full">
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
          </div>

          <div className="min-w-[200px] hidden md:block">
            <strong>{filteredCountries?.length || 0}</strong> Countries Found
          </div>
        </div>

        <div className="mt-6 lg:mt-0">
          <select
            className="w-auto min-w-[200px] lg:w-full"
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
      <div
        className={classNames(
          "px-6 grid gap-10 grid-cols-1 max-w-[350px] mx-auto",
          "md:grid-cols-2 md:gap-16 md:max-w-none",
          "xl:grid-cols-4"
        )}
      >
        {filteredCountries?.map((country, i) => (
          <CountryCard country={country} key={i} />
        ))}
      </div>
    </PageTransition>
  );
}

export const getServerSideProps = async () => {
  try {
    // Fetch all countries from the API but only include necessary fields to reduce payload size
    const countries =
      (await fetch(
        `https://restcountries.com/v3.1/all?fields=flags,name,capital,region,population`
      )) || null;

    return {
      props: {
        countries: await countries.json(),
      },
    };
  } catch (error) {
    // Handle error logging
    console.log(error);
    return {
      props: {
        countries: null,
      },
    };
  }
};
