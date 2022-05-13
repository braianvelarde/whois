import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { who } from "../types";
import axios from "axios";

const Home: NextPage = () => {
  const [ip, setIp] = useState();
  const [ipData, setIpData] = useState<any>();
  // const fetcher = (...args: [string]) =>
  //   fetch(...args, { method: "GET" }).then((res) => res.json());
  // const { data, error } = useSWR<who>(
  //   `https://rdap.lacnic.net/rdap/ip/${ip}`,
  //   fetcher
  // );

  useEffect(() => {
    const fetchIp = axios("https://api.ipify.org?format=json")
      .then((res) => {
        setIp(res.data.ip);
        axios(`https://rdap.lacnic.net/rdap/ip/${res.data.ip}`)
          .then((datares) => setIpData(datares.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => err);
  }, []);

  // if (error) return <div>failed to load</div>;
  if (!ipData) return <div>loading...</div>;
  // renderizar datos
  return (
    <div>
      <p>Hola! Tu ip es: {ip}</p>
      <p>
        Tu proveedor es:{" "}
        {ipData.entities[0].vcardArray.map((item: any) => (
          <span key={item[1][1]}>{item[1][3]}</span>
        ))}{" "}
        <span key={ipData.entities[0].handle}>
          ({ipData.entities[0].handle})
        </span>
      </p>
      <p>
        El rangorango de ip del proveedor es{" "}
        {ipData.startAddress + "/" + ipData.endAddress}
      </p>
      <p>
        Representante legal: {ipData.lacnic_legalRepresentative || "no info"}
      </p>
    </div>
  );
};

export default Home;
