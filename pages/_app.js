import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import Router from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

// import Layout from "../components/Layout/Layout";

import "../styles/globals.css";
import { AppProvider } from "../assets/context";

nProgress.configure({
  minimum: 0.8,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    const start = () => {
      nProgress.start();
    };
    const end = () => {
      nProgress.done();
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
