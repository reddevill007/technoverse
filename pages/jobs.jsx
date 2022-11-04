import Sidebar from "../components/Sidebar";
import JobComp from "../components/JobComp";
import Login from "../components/Login";

import { getProviders, getSession, useSession } from "next-auth/react";

const jobs = ({ providers }) => {
  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />;

  return (
    <div>
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
