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
      if (!res.ok) {
        throw new Error("Cannot get IP address");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    // getting the ip address of the user
  };
  const getPosition = async (ip) => {
    try {
      const result = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await result.json();
      setInfo(data);
      // console.log(data);
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
      });
      if (!result.ok) {
        throw new Error("Cannot get location");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    // getting the location of the user using the ip address
  };
  useEffect(() => {
    getData();
    getPosition(ip);
    // eslint-disable-next-line
  }, []);

  const updateMapOnClick = async (ip) => {
    try {
      if (input) {
        setIP(input);
        setInput("");
        const result = await fetch(`https://ipapi.co/${input}/json/`);
        if (!result.ok) {
          throw new Error("Cannot get your new location");
        }
        const data = await result.json();
        setInfo(data);
        // console.log(data);
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log("error from update", error);
      setError(error.message);
    }
  };

  return (
    <div className="container-main flex flex-col relative  h-screen  ">
      <div className="search-bar-container h-2/4 min-w-full bg-cover  flex flex-col gap-5 justify-center items-center  ">
        <h2 className="xl:text-4xl mb-3 text-2xl sm:text-2xl md:text-3xl lg:text-4xl  items-center font-semibold  text-white">
          IP Address Tracker
        </h2>
        <div className=" md:w-2/5 w-4/5 sm:w-4/6  lg:w-1/3 items-center flex justify-center h-18 mt-0 mb-0 ">
          <input
            type="search"
            className="md:w-3/4 w-3/4 lg:w-4/5 bg-white md:h-14 rounded-l-lg p-2 text-black focus:outline-none"
            placeholder="Search for any IP address or domain"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => updateMapOnClick(ip)}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="bg-black  rounded-e-lg h-10 sm:h-full md:max-h-14 w-14 lg:w-20   flex justify-center items-center "
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
      </div>

      <div className="stats">
        <div className="md:border-r-2 w-full border-slate-300 flex flex-col gap-4 items-center ">
          <p className="text-sm text-slate-400 font-semibold ">IP Address</p>
          <p className="md:text-2xl text-black font-bold">
            {loading ? "Loading..." : info.ip}
          </p>
        </div>
        <div className="md:border-r-2 w-full border-slate-300 flex flex-col gap-4 items-center ">
          <p className="text-sm text-slate-400 font-semibold ">Location</p>
          <p className="md:text-2xl text-black font-bold">
            {loading ? "Loading..." : info.country}, {info.city}
          </p>
        </div>
        <div className="md:border-r-2 w-full border-slate-300 flex flex-col gap-4 items-center ">
          <p className="text-sm text-slate-400 font-semibold ">Timezone</p>
          <p className="md:text-2xl text-black font-bold">
            {loading ? "Loading..." : info.timezone}
          </p>
        </div>
        <div className="w-full flex flex-col gap-2 items-center ">
          <p className="text-sm text-slate-400 font-semibold mr-4">ISP</p>
          <p className="md:text-2xl text-black font-bold">
            {loading ? "Loading..." : info.org}
          </p>
        </div>
      </div>

      <div className="h-full w-full">
        {loading ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <Map center={location} error={error} />
        )}
      </div>
    </div>
  );
}

export default App;
