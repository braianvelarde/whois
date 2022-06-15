import type { NextPage } from "next";
import Data from "../components/data";
import requestIp from "request-ip";
import { GetServerSidePropsContext } from "next";

const Home: NextPage = () => {
  return (
    <>
      <header>
        <nav className="shadow-md flex items-center justify-center">
          <span className="font-bold text-3xl p-4">WHOIS IP</span>
        </nav>
      </header>
      <section className=" flex justify-center items-center flex-col px-4 mt-16">
        <h1 className="text-xl font-bold">Whois data result</h1>
        <p className="text-sm tracking-wide">
          See your ip address and its ISP data
        </p>
        <article className="mt-8">
          <Data detectedIp={""} />
        </article>
      </section>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const detectedIp = requestIp.getClientIp(ctx.req);
  return {
    props: {
      detectedIp,
    },
  };
}

export default Home;
