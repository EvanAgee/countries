import AppLayout from "@/layouts/AppLayout/AppLayout";
import classNames from "classnames";
import Image from "next/image";
import * as React from "react";
import PageTransition from "@/components/PageTransition";
import Button from "@/components/Button/Button";
import { useRouter } from "next/router";
import {
  Country,
  getBorderCountries,
  getCountry,
} from "@/services/CountryService";

export interface ICountryPageProps {
  country: Country;
}

export default function CountryPage({ country }: ICountryPageProps) {
  console.log({ country });
  const router = useRouter();

  const displayFields = React.useMemo(() => {
    return [
      {
        label: "Native Name",
        value: Object.keys(country.name.nativeName)
          .map((key: string) => country.name.nativeName?.[key as any]?.common)
          .join(", "),
      },
      {
        label: "Top Level Domain",
        value: country.tld[0],
      },
      {
        label: "Population",
        value: country.population.toLocaleString(),
      },
      {
        label: "Currencies",
        value: Object.keys(country.currencies)
          .map((key: string) => country.currencies?.[key]?.name)
          .join(", "),
      },
      {
        label: "Region",
        value: country.region,
      },
      {
        label: "Languages",
        value: Object.keys(country.languages)
          .map((key: string) => country.languages?.[key])
          .join(", "),
      },
      {
        label: "Sub Region",
        value: country.subregion,
      },
      {
        label: "Capital",
        value: country.capital,
      },
    ];
  }, [country]);

  return (
    <PageTransition>
      <Button
        className="min-w-[136px] ml-6 mb-12 lg:mb-20 flex items-center justify-center shadow-[0px_0px_7px_rgba(0,_0,_0,_0.293139)] lg:shadow-none rounded-[2px]"
        onClick={() => router.back()}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <g id="call-made">
            <path
              id="Shape"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z"
              className="fill-current"
            ></path>
          </g>
        </svg>
        Back
      </Button>
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-[120px] text-base px-6 pb-24">
        <div className="lg:w-[560px]">
          <Image
            src={country.flags.svg}
            alt={country.name.common}
            width="560"
            height="560"
            className="w-full h-auto object-cover rounded-xl shadow-xl mb-12 lg:mb-0"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl lg:text-4xl font-extrabold mb-6">
            {country.name.common}
          </h1>
          <ul className="grid lg:grid-cols-2 gap-3 font-light mb-12">
            {displayFields.map((field, i) => (
              <li
                key={i}
                className={classNames({
                  "lg:col-start-1": i + 1 === displayFields.length,
                  "mb-10 lg:mb-0": i === 3,
                })}
              >
                <strong className="font-medium">{field.label}:</strong>{" "}
                {field.value}
              </li>
            ))}
          </ul>

          {country?.fullBorders && (
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <h4 className="font-semibold whitespace-nowrap">
                Border Countries:
              </h4>
              <ul className="flex items-center flex-grow gap-2 flex-wrap">
                {country?.fullBorders?.map((border, i) => (
                  <li key={i}>
                    <Button
                      className="border-2 dark:bg-dark-gray-400 min-w-[96px] flex items-center justify-center px-3"
                      href={`/${border.name.common}`}
                    >
                      {border.name.common}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export const getServerSideProps = async (context: any) => {
  const { country } = context.params;
  let c = await getCountry(country);
  c = await getBorderCountries(c);

  return {
    props: {
      country: c,
    },
  };
};
