import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, atom, useAtom, useSetAtom } from "jotai";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />{" "}
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
