import React from "react";

export const DataMock = () => {
  return (
    <article className="p-8 rounded-sm hover:shadow-md transition-all duration-150">
      <h2>Your IP address is: 190.107.245.2</h2>
      <p>
        ISP: <span>Proveedor</span> <span>ASN</span>
      </p>
      <p>
        IP range <span>190.107.244.0/190.107.245.255</span>
      </p>
      <p>
        Abuse Reports: <span>Dueño</span>
      </p>
    </article>
  );
};
