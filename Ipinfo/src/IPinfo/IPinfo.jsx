import React, { useEffect, useState } from "react";
import "./IpInfo.css";

const IPinfo = () => {
  const [ipInfo, setIpInfo] = useState(null);
  const [error, setError] = useState(null);
  const [ip, setIp] = useState("");

  useEffect(() => {
    async function getIpInfo() {
      if (ip.trim() === "") return;

      try {
        const res = await fetch(`https://ipinfo.io/${ip}/geo`);
        if (!res.ok) throw new Error("Network response not ok");
        const data = await res.json();
        setIpInfo(data);
      } catch (error) {
        setError(error.message);
      }
    }

    getIpInfo();
  }, [ip]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ipValue = e.target.elements.ip.value.trim();
    if (ipValue) {
      setIp(ipValue);
    }
  };

  return (
    <div className="ipinfo-container">
      <h1>IP Information</h1>
      <form onSubmit={handleSubmit} className="ip-form">
        <label htmlFor="ip">Enter IP Address: </label>
        <input
          type="text"
          name="ip"
          id="ip"
          placeholder="e.g., 1.1.1.1"
        />
        <button type="submit">Submit</button>
      </form>

      {error && <div className="error-message">Error: {error}</div>}
      {ipInfo && !error && (
        <div className="ip-info">
          <h2>IP Details</h2>
          <ul>
            <li>
              <strong>IP:</strong> {ipInfo.ip}
            </li>
            <li>
              <strong>City:</strong> {ipInfo.city}
            </li>
            <li>
              <strong>Region:</strong> {ipInfo.region}
            </li>
            <li>
              <strong>Country:</strong> {ipInfo.country}
            </li>
            <li>
              <strong>Location:</strong> {ipInfo.loc}
            </li>
            <li>
              <strong>Organization:</strong> {ipInfo.org}
            </li>
            <li>
              <strong>Postal Code:</strong> {ipInfo.postal}
            </li>
            <li>
              <strong>Timezone:</strong> {ipInfo.timezone}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default IPinfo;
