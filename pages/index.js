import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";


const Home = () => {
  return (
    <div>
      <Head>
        <title>Technoverse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-full mx-auto">
        <Sidebar />

        <Feed />
        {/* Widget */}

        {/* Modal */}
      </main>
    </div>
  );
};

export default Home;
