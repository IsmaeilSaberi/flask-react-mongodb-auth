import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const mapContainerRef = useRef(null);

  const openFullscreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitEnterFullscreen) {
      element.webkitEnterFullscreen();
    } else if (element.webkitEnterFullScreen) {
      element.webkitEnterFullScreen();
    }
  };
  

  const locations = [
    { lat: 37.398523831855655, lon: 46.238740677491855, name: "بیمارستان سینا", image: "https://soft14.storage.iran.liara.space/Patient%20online/10130-scaled.jpg" },
    { lat: 37.395776062028325, lon: 46.244751804717176, name: "بیمارستان شهید بهشتی", image: "https://soft14.storage.iran.liara.space/Patient%20online/10130-scaled.jpg" },
    { lat: 37.421190494377136, lon: 46.220602136062375, name: "بیمارستان امام علی(ع)", image: "https://soft14.storage.iran.liara.space/Patient%20online/10130-scaled.jpg" },
    { lat: 37.392089676947634, lon: 46.22881525962098, name: "درمانگاه 29 فروردین (ارتش)", image: "https://soft14.storage.iran.liara.space/Patient%20online/10130-scaled.jpg" },
  ];

  const handleImageClick = () => {
    const mapContainer = mapContainerRef.current;
    if (mapContainer) {
      openFullscreen(mapContainer);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-12 justify-center items-center bg-gradient-to-r from-pink-200 via-blue-400 text-white to-emerald-500">
      <div className="flex flex-col gap-10 mb-4">
        <h1 className="text-3xl font-extrabold">
          به صورت آنلاین بیمارستان‌ها را کاوش کنید!
        </h1>
        <div className="w-full flex flex-col items-center gap-4 h-96 bg-white rounded-lg shadow-md p-4">
          <MapContainer
            ref={mapContainerRef}
            center={[38.8977, -77.0365]}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© OpenStreetMap contributors'
            />
            {locations.map((location, index) => (
              <Marker
                key={index}
                position={[location.lat, location.lon]}
                icon={
                  new L.Icon({
                    iconUrl: location.image,
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                  })
                }
              >
                <Popup>
                  <div>
                    <h2>{location.name}</h2>
                    <img src={location.image} alt={location.name} style={{ maxWidth: "100%" }} />
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <button
            onClick={handleImageClick}
            className="mt-4 text-sm p-2 bg-blue-500 w-44 text-white border-2 border-black rounded-md"
          >
            تمام صفحه
          </button>
        </div>
      </div>
      <div className="mt-4 text-md">
        <ul>
        <li>
            دوستان لطفاً توجه داشته باشید که به دلیل محدودیت‌ها فعلاً می‌توانید بیمارستان های  شهرستان مراغه را
            کاوش کنید با سپاس و تشکر فراوان.
          </li>
          <li>
            با زدن روی هر مکان مشخص شده در نقشه وضعیت بیمارستان و دکتران مشغول
            در آن را به صورت زنده ببینید.
          </li>
          <li>
            قبل از زدن دکمه حرکت به سمت مرکز موقعیت مکانی خود را باز کنید و
            همراه با نقشه به سمت مقصد خود حرکت کنید.
          </li>
          <li>در صورت بروز مشکل به پشتیبانی آنلاین مراجعه کنید.</li>
        </ul>
      </div>
    </div>
  );
};

export default MapPage;
