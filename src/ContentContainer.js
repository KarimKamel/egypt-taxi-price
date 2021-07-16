import { useJsApiLoader } from "@react-google-maps/api";
import React, { useState } from "react";
import Forms04 from "./Forms04";
import Gmap from "./Gmap";
import TripInfo from "./TripInfo";
import { calculateFare, calculateTime } from "./utils/utils";

export default function ContentContainer() {
  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [center, setCenter] = useState({ lat: 30, lng: 31 }); //cairo
  const [originPosition, setOriginPosition] = useState();
  const [destinationPosition, setDestinationPosition] = useState();
  const [tripPrice, setTripPrice] = useState(0);
  const [tripDuration, setTripDuration] = useState({ hours: 0, minutes: 0 });
  const [tripDistance, setTripDistance] = useState(0);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCeDbzkBUMghS9nQtS0fVySysUxKNDkYyo",
  });

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  async function getTripData(service, originName, destinationName) {
    var localResponse;
    const request = {
      origins: [originName],
      destinations: [destinationName],
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };

    await service.getDistanceMatrix(request).then(response => {
      console.log(response);
      localResponse = response;
    });
    return localResponse;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    var geocoder = new window.google.maps.Geocoder();
    var service = new window.google.maps.DistanceMatrixService();
    const response = await getTripData(service, originName, destinationName);
    const distanceInMeters = response.rows[0].elements[0].distance;
    const durationInSeconds = response.rows[0].elements[0].duration;
    const _tripPrice = calculateFare(
      distanceInMeters.value,
      durationInSeconds.value
    );

    setTripDistance(distanceInMeters.value / 1000);
    const { hours, minutes } = calculateTime(durationInSeconds.value);
    setTripDuration({ hours, minutes });
    setTripPrice(_tripPrice);
    const originFullName = response.originAddresses[0];
    const destinationFullName = response.destinationAddresses[0];
    const bounds = new window.google.maps.LatLngBounds();

    Promise.all([
      geocoder.geocode({ address: originFullName }),
      geocoder.geocode({ address: destinationFullName }),
    ]).then(values => {
      const originLocation = values[0].results[0].geometry.location;
      const destinationLocation = values[1].results[0].geometry.location;

      setOriginPosition(originLocation);
      setDestinationPosition(destinationLocation);
      bounds.extend(originLocation);
      bounds.extend(destinationLocation);
      map.fitBounds(bounds);

      map.setZoom(map.getZoom() - 1);
    });
  };

  return (
    <section className="fdb-block py-0">
      <div
        className="container py-5 my-5"
        style={{ backgroundImage: "url(imgs/shapes/6.svg)" }}>
        <div className="row">
          <Forms04
            handleSubmit={handleSubmit}
            setOriginName={setOriginName}
            setDestinationName={setDestinationName}
          />

          {isLoaded && (
            <Gmap
              center={center}
              onLoad={onLoad}
              onUnmount={onUnmount}
              originPosition={originPosition}
              destinationPosition={destinationPosition}
            />
          )}
          <TripInfo
            tripPrice={tripPrice}
            tripDistance={tripDistance}
            tripDuration={tripDuration}
          />
        </div>
      </div>
    </section>
  );
}
