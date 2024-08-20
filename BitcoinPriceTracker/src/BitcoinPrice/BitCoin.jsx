import { useEffect, useState } from "react";

const BitCoin = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      }
    }

    getData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  const { bpi } = data;
  console.log(bpi);

  return (
    <div>
      <h1>Bitcoin Price</h1>
      <p>
        <strong>USD:</strong> {bpi.USD.rate} <span>$</span>
      </p>
      <p>
        <strong>GBP:</strong> {bpi.GBP.rate} <span>£</span>
      </p>
      <p>
        <strong>EUR:</strong> {bpi.EUR.rate} <span>€</span>
      </p>
    </div>
  );
};

export default BitCoin;
