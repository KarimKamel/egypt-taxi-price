import React, { useState, useEffect, Fragment } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Header from "./Header";
import ContentContainer from "./ContentContainer";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const formRowContainer = {
  display: "flex",
};

function MyComponent() {
  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [center, setCenter] = useState({ lat: 30, lng: 31 });
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
  function renderMap() {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}>
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {originPosition && <Marker position={originPosition} />}
          {destinationPosition && <Marker position={destinationPosition} />}
        </>
      </GoogleMap>
    );
  }

  return (
    <Fragment>
      <Header />
      <ContentContainer map={map} />

      {/* {isLoaded ? renderMap() : null} */}
    </Fragment>
  );
}

export default React.memo(MyComponent);
