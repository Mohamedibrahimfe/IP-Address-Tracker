import "./App.css";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import Map from "./components/Map";
function App() {
  const [input, setInput] = useState("");
  const [ip, setIP] = useState("");
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const getData = async () => {
    try {
      const res = await fetch("https://api.ipify.org/?format=json");
      const data = await res.json();
      setIP(data.ip);
      throw new Error("error");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    // getting the ip address of the user
  };
  useEffect(() => {
    getData();
  }, [setInput]);
  const getPosition = async () => {
    try {
      const result = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await result.json();
      setInfo(data);
      // console.log(data);
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
      });
      throw new Error("error");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    // getting the location of the user using the ip address
  };
  useEffect(() => {
    getPosition();
  }, []);

  const handleClick = () => {
    setIP(input);
    getPosition();
    setError("");
    setInput("");
  };
  return (
    <div className="container-main absolute top-0 left-0 right-0 h-screen max-h-screen  ">
      <div className="absolute left-0 right-0  mt-5   flex  justify-center ">
        <h1 className="text-gray-100 font-bold mt-5 text-4xl ">
          IP Address Tracker
        </h1>
      </div>
      <div className="absolute left-0 right-0  mt-28   flex  justify-center gap-0">
        <input
          type="search"
          className="rounded-s-xl text-xl p-2 h-14 w-1/4"
          placeholder="Search for any IP address or domain"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleClick}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon w-12 bg-black h-14 p-2 rounded-e-xl"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M10 7L15 12L10 17"
                stroke="#ffffff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>

      <img
        src="/images/pattern-bg-desktop.png"
        className="pattern-bg w-full  h-80"
        alt=""
      />

      <div className="absolute  bg-white text-gray-500 w-1/2 h-32 flex gap-4 justify-around p-4 rounded-xl left-0 right-0 mx-auto -mt-16 z-40  shadow-sm ">
        <div className="  border-r-2 border-gray-400/50 ">
          <h2 className="font-bold ">IP Address</h2>
          <p className=" text-gray-900 mt-4 mr-4 text-xl">{ip}</p>
        </div>
        <div className="  border-r-2 border-gray-400/50 ">
          <h2 className="font-bold ">Location</h2>
          <p className=" text-gray-900 mt-4 mr-4 text-xl">
            {info.country}, {info.city}
          </p>
        </div>
        <div className="  border-r-2 border-gray-400/50 ">
          <h2 className="font-bold ">Timezone</h2>
          <p className=" text-gray-900 mt-4 mr-4 text-xl">
            UTC {info.timezone}
          </p>
        </div>
        <div>
          <h2 className="font-bold mr-4">ISP</h2>
          <p className=" text-gray-900 mt-4 mr-4 text-xl">{info.org}</p>
        </div>
      </div>
      <div className="h-96 absolute z-10 left-0 right-0  ">
        {loading ? <p className="">Loading...</p> : null}
        {error ? <p className="text-red-500 ">{error}</p> : null}
        <Map center={location} />
      </div>
    </div>
  );
}

export default App;
