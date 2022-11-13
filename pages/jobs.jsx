import Sidebar from "../components/Sidebar";
import JobComp from "../components/JobComp";
import Login from "../components/Login";

import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";

const jobs = ({ providers }) => {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen w-full">
      <Head>
        <title>Technoverse - Jobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <JobComp />
    </div>
  );
};

export default jobs;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}
