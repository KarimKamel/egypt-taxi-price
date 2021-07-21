import React from "react";

import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  height: "400px",
};

export default function Gmap(props) {
  const {
    center,
    onLoad,
    onUnmount,
    originPosition,
    destinationPosition,

    onOriginDragEnd,
    onDestinationDragEnd,
  } = props;

  return (
    <div className="col-12 col-md-8 col-lg-6 col-xl-6 text-left px-lg-4">
      <div className="row  my-md-3 my-lg-3">
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
                  onDragEnd={onOriginDragEnd}
                  position={originPosition}
                />
              )}
              {destinationPosition && (
                <Marker
                  label={"end"}
                  position={destinationPosition}
                  draggable={true}
                  onDragEnd={onDestinationDragEnd}
                />
              )}
            </>
          </GoogleMap>
        </div>
      </div>
      {props.children}
    </div>
  );
}
