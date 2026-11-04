import { useEffect } from "react";

function InteractiveMap() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBUAqsHZx-sPvge3V5vTBg8BFb7jKbV9h8`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.2922787, lng: 85.7431013 },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat: 20.2922787, lng: 85.7431013 },
        map,
        title: "Quotus Office",
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="rounded-xl shadow-2xl h-64 md:h-80 overflow-hidden">
      <div id="map" className="w-full h-full rounded-lg"></div>
    </div>
  );
}

export default InteractiveMap;
