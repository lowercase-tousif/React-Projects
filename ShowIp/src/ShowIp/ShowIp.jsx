import { useEffect, useState } from "react";

const ShowIp = () => {
  const [ip, setIp] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getIp() {
      try {
        const res = await fetch("https://api.ipify.org/?format=json");
        if (!res.ok) throw Error("Network res is not ok");
        const data = await res.json();
        setIp(data);
      } catch (error) {
        setError(error);
      }
    }
    getIp();
  }, []);
  console.log(ip);

  return (
    <div>
      <h1>Your IP </h1>
      <p>{ip.ip}</p>
    </div>
  );
};

export default ShowIp;
