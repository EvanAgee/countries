import { slugify } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface ICountryCardProps {
  country: any;
}

export default function CountryCard({ country }: ICountryCardProps) {
  return (
    <Link href={`/${country.name.common}`}>
      <article className="bg-white dark:bg-dark-gray-400 shadow-lg rounded-md overflow-hidden text-black dark:text-white hover:shadow-sm transition-shadow duration-300">
        <figure
          className="relative w-full aspect-[264/160] overflow-hidden bg-cover bg-center rounded-t-md"
          style={{
            backgroundImage: `url(${country.flags.svg})`,
          }}
        />
        <div className="p-6">
          <h2 className="font-extrabold text-lg mb-3">{country.name.common}</h2>
          <ul className="text-sm font-light opacity-50 leading-6">
            {["population", "region", "capital"].map((item, i) => (
              <li key={i} className="flex items-center">
                <span className="capitalize font-semibold mr-2">{item}:</span>
                {country[item]}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Link>
  );
}
