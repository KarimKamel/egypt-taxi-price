import React from "react";

import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

export default function Gmap(props) {
  const { center, onLoad, onUnmount, originPosition, destinationPosition } =
    props;
  return (
    <div className="col-12 col-md-8 col-lg-6 col-xl-6 text-left">
      <div className="row p-5">
        <div className="col">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}>
            {/* Child components, such as markers, info windows, etc. */}
            <>
              {originPosition && (
                <Marker
                  label={"start"}
                  draggable={true}
                  onDragEnd={e => console.log(e.latLng.lat())}
                  position={originPosition}
                />
              )}
              {destinationPosition && (
                <Marker label={"end"} position={destinationPosition} />
              )}
            </>
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}