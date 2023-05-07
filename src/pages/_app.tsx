import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import nProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  nProgress.configure({});
  Router.events.on("routeChangeStart", () => nProgress.start());
  Router.events.on("routeChangeComplete", () => nProgress.done());
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          refreshInterval: 1000 * 30,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
        <Toaster />
      </SWRConfig>
    </SessionProvider>
  );
}
