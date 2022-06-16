import { useQuery } from "react-query";

interface Props {
  detectedIp: string;
}

export default function Data({ detectedIp }: Props) {
  const {
    isLoading,
    error,
    data: ipData,
  } = useQuery("repoData", () =>
    fetch(`https://rdap.lacnic.net/rdap/ip/${detectedIp}`).then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>An error has been ocurred</p>;
  }

  return (
    <article className="p-8 rounded-md hover:shadow-md transition-all duration-150">
      <h2>Tu ip es: {detectedIp}</h2>
      <p>
        Tu proveedor es:{" "}
        {ipData?.entities[0].vcardArray.map((item: any, idx: number) => (
          <span key={idx}>{item[1][3]}</span>
        ))}{" "}
        <span key={ipData?.entities[0].handle}>
          ({ipData?.entities[0].handle})
        </span>
      </p>
      <p>
        El rango de ip del proveedor es{" "}
        {ipData?.startAddress + "/" + ipData?.endAddress}
      </p>
      <p>
        Representante legal: {ipData?.lacnic_legalRepresentative || "no info"}
      </p>
    </article>
  );
}
