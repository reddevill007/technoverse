import Sidebar from "../components/Sidebar";
import News from "../components/News";

import { getProviders, getSession, useSession } from "next-auth/react";
import { useGlobalContext } from "../assets/context";

const news = ({ providers }) => {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;

  const data = useGlobalContext();

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-black min-h-screen flex w-full">
      <Sidebar />
      <News data={data} />
    </div>
  );
};

export default news;

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
