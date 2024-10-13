import "./App.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
function App() {
  // const [ip, setIP] = useState("");
  // const [location, setLocation] = useState({
  //   lat: 0,
  //   lng: 0,
  // });
  // const getData = async () => {
  //   const res = await fetch("https://api.ipify.org/?format=json");
  //   const data = await res.json();
  //   setIP(data.ip);
  //   // console.log(data.ip);
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
  // const getPosition = async () => {
  //   const result = await fetch(
  //     `https://geo.ipify.org/api/v2/country,city?apiKey=at_rZQn2szygvdbjegfpNCpbFQth5LwO&ipAddress=${ip}`
  //   );
  //   const data = await result.json();
  //   const result2 = data.location;
  //   setLocation(result2);
  //   console.log(result2);
  // };
  // useEffect(() => {
  //   getPosition();
  // }, []);
  const position = [51.505, -0.09];
  return (
    <div className="container-main relative h-screen max-h-screen overflow-hidden ">
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
        />
        <button>
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

      <div className="absolute bg-white text-gray-500 w-1/3 flex gap-10 p-5 rounded-xl left-0 right-0 mx-auto -mt-16 z-50">
        <div className=" w-1/3 border-r-2 border-gray-400/50 ">
          <h2 className="font-bold">IP Address</h2>
          <p>38.0.101.76</p>
        </div>
        <div className=" w-1/3 border-r-2 border-gray-400/50 ">
          <h2 className="font-bold">Location</h2>
          <p>Brooklyn, New York</p>
        </div>
        <div className=" w-1/3 border-r-2 border-gray-400/50 ">
          <h2 className="font-bold">Timezone</h2>
          <p>UTC -8:00</p>
        </div>
        <div>
          <h2 className="font-bold">ISP</h2>
          <p>SpaceX Starlink</p>
        </div>
      </div>

      <div className=" w-full h-4/6 absolute z-10 ">
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
