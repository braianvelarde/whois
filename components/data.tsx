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
    <article className="p-8 flex flex-col md:grid md:grid-cols-3 gap-6">
      <div className="rounded-md bg-gray-800 px-8 py-10 border-t-8 border-orange-500 flex flex-col">
        <h2 className="text-sm">Your IP</h2>
        <p className="text-xl font-semibold tracking-wide">{detectedIp}</p>
      </div>
      <div className="rounded-md bg-gray-800 px-8 py-10 border-t-8 border-emerald-500 col-span-2 flex flex-col gap-3">
        <p className="text-sm">
          Internet service provider:{" "}
          <div className="flex flex-col">
            {ipData?.entities[0].vcardArray.map((item: any, idx: number) => (
              <span className="text-xl font-semibold tracking-wide" key={idx}>
                {item[1][3]}
              </span>
            ))}{" "}
            <span className="font-light" key={ipData?.entities[0].handle}>
              ({ipData?.entities[0].handle})
            </span>
          </div>
        </p>
        <p className="text-xs font-light">
          IP Range: {ipData?.startAddress + "/" + ipData?.endAddress}
        </p>
      </div>
      <div className="rounded-md bg-gray-800 px-8 py-10 border-t-8 border-rose-400">
        <p>
          Representante legal: {ipData?.lacnic_legalRepresentative || "no info"}
        </p>
      </div>
    </article>
  );
}
