import { useEffect, useState } from "react";

const CatFacts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://catfact.ninja/fact");
        if (!res.ok) throw Error("Network response not ok");
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
    }

    getData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;
  console.log(data);

  return (
    <div>
      <h1>Cat facts</h1>
      <p>{data.fact}</p>
      <p>Length : {data.length}</p>
    </div>
  );
};

export default CatFacts;
