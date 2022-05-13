import type { NextPage } from "next";
import useSWR from "swr";
import { who } from "./types";

const Home: NextPage = ({ ip }: any) => {
  const fetcher = (...args: [string]) =>
    fetch(...args, { method: "GET" }).then((res) => res.json());
  const { data, error } = useSWR<who>(
    `https://rdap.lacnic.net/rdap/ip/${ip}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // renderizar datos

  return (
    <div>
      hello {ip}
      <p>rango de ip {data.startAddress + "/" + data.endAddress}</p>
      <p>Representante legal: {data.lacnic_legalRepresentative || "no info"}</p>
      <p>
        Registrante: {data.entities[0].handle} from{" "}
        {data.entities[0].vcardArray.map((item) => (
          <span key={item[1][1]}>{item[1][3]}</span>
        ))}
      </p>
    </div>
  );
};

export async function getServerSideProps() {
  const data = await (await fetch("https://api.ipify.org?format=json")).json();

  return {
    props: {
      ip: data.ip,
    },
  };
}

export default Home;
