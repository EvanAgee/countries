import * as React from "react";
import { Nunito_Sans } from "next/font/google";
import { useTheme } from "@/context/ThemeContext";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const font = Nunito_Sans({ subsets: ["latin"] });

export interface IAppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: IAppLayoutProps) {
  const { darkModeActive, toggleDark } = useTheme();
  const router = useRouter();

  return (
    <div
      data-testid="app-layout"
      className={classNames(
        `flex flex-col ${font.className} bg-[#F2F2F2]  min-h-screen transition-colors`,
        {
          "dark bg-dark-gray-500": darkModeActive,
          "lg:bg-white": router.route == "/[country]" && !darkModeActive,
        }
      )}
    >
      <header className="bg-white dark:bg-dark-gray-400 text-black dark:text-white font-extrabold text-2xl py-5 flex justify-between transition-colors shadow-sm px-6">
        <div className="container flex justify-between">
          <Link href="/">
            <h1 className="text-lg lg:text-3xl">Where in the world?</h1>
          </Link>
          <button
            data-testid="dark-mode-button"
            className="flex items-center font-semibold text-xs lg:text-base"
            onClick={() => {
              localStorage.setItem("darkMode", `${!darkModeActive}`);
              toggleDark(!darkModeActive);
            }}
          >
            {darkModeActive ? (
              <svg
                className="fill-current mr-2"
                width={20}
                height={20}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                enableBackground="new 0 0 512 512"
              >
                <g>
                  <g>
                    <path d="m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z" />
                    <path d="m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z" />
                    <path d="m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z" />
                    <path d="m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z" />
                    <path d="m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z" />
                    <path d="M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z" />
                    <path d="m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z" />
                    <path d="m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z" />
                    <path d="m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z" />
                  </g>
                </g>
              </svg>
            ) : (
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z"
                  className="fill-white stroke-[#111517] stroke-width-[1.25]"
                />
              </svg>
            )}{" "}
            <span>{darkModeActive ? "Light" : "Dark"} Mode</span>
          </button>
        </div>
      </header>
      <main className="flex-grow text-black dark:text-white">
        <div className="container pt-12">{children}</div>
      </main>
    </div>
  );
}
