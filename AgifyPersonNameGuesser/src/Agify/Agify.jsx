import React, { useEffect, useState } from "react";

const Agify = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`https://api.agify.io/?name=${name}`);
        if (!res.ok) throw Error("Network response not ok");
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error);
      }
    }

    getData();
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target.elements.name.value);
  };

  console.log(data);

  return (
    <div>
      <h1>Person age guesser</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name </label>
        <input type="text" name="name" />
        <button type="Submit">Submit</button>
      </form>
      {data && (
        <div>
          <p>Name: {data.name}</p>
          <p>Age: {data.age}</p>
        </div>
      )}
    </div>
  );
};

export default Agify;
