import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Login from "../components/Login";

import { getProviders, getSession, useSession } from "next-auth/react";
import Modal from "../components/Modal";

const Home = ({ trendingNews, providers }) => {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <Head>
        <title>Technoverse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen flex max-w-full mx-auto">
        <Sidebar />

        <Feed />
        {/* Widget */}

        <Modal />
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const trendingNews = await fetch(
    "https://gnews.io/api/v4/search?lang=en&country=in&q=technology&token=be3d5b0e883f00ffabb233f6f7032716"
  ).then((res) => res.json());

  // console.log(trendingResults);
  // const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
  //   (res) => res.json()
  // );
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingNews,
      // followResults,
      providers,
      session,
    },
  };
}
