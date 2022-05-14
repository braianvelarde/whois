import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { who } from "../types";
import axios from "axios";

const Home: NextPage = () => {
  // const [ip, setIp] = useState();
  // const [ipData, setIpData] = useState<any>();

  const fetchIp = async (url: string) => {
    return await fetch(url).then((res) => res.json());
  };

  const fetchWhodata = async (url: string) => {
    return await fetch(url).then((res) => res.json());
  };

  const { data: ip, error: iperror } = useSWR("/api/getip", fetchIp);
  const { data: whodata, error: whoerror } = useSWR(
    () => `https://rdap.lacnic.net/rdap/ip/${ip}`,
    fetchWhodata
  );

  // useEffect(() => {
  //   const fetchIp = axios("https://api.ipify.org", {
  //     method: "GET",
  //     headers: { "Access-Control-Allow-Origin": "*" },
  //     params: { format: "json" },
  //   })
  //     .then((res) => {
  //       setIp(res.data.ip);
  //       axios(`https://rdap.lacnic.net/rdap/ip/${res.data.ip}`)
  //         .then((datares) => setIpData(datares.data))
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => err);
  // }, []);
  if (iperror) return <div>{iperror.message}</div>;
  if (!ip) return <div>loading...</div>;
  return (
    <p>
      hola {ip} {whodata?.entities[0].handle}
    </p>
  );
  // renderizar datos
  // return (
  //   <div>
  //     <p>Hola! Tu ip es: {ip}</p>
  //     <p>
  //       Tu proveedor es:{" "}
  //       {ipData.entities[0].vcardArray.map((item: any) => (
  //         <span key={item[1][1]}>{item[1][3]}</span>
  //       ))}{" "}
  //       <span key={ipData.entities[0].handle}>
  //         ({ipData.entities[0].handle})
  //       </span>
  //     </p>
  //     <p>
  //       El rangorango de ip del proveedor es{" "}
  //       {ipData.startAddress + "/" + ipData.endAddress}
  //     </p>
  //     <p>
  //       Representante legal: {ipData.lacnic_legalRepresentative || "no info"}
  //     </p>
  //   </div>
  // );
};

export default Home;
