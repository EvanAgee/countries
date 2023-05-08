import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/context/ThemeContext";
import AppLayout from "@/layouts/AppLayout/AppLayout";
import { AnimatePresence, motion } from "framer-motion";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider>
      <AppLayout>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </AppLayout>
    </ThemeProvider>
  );
}
