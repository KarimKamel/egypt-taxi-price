import React from "react";
import "./TripInfo.css";

export default function TripInfo(props) {
  const { tripDuration, tripDistance, tripPrice, id } = props;
  return (
    <div class="col-12 px-lg-4 d-flex ">
      {tripDistance !== 0 && (
<<<<<<< HEAD
        <div id={id} className="trip-info-container w-100 my-3 my-lg-0 ">
=======
        <div id={id} className="trip-info-container w-100 text-center my-md-3 ">
>>>>>>> cssfix
          <h3 className="mt-3 ">
            Trip Duration:{" "}
            <span>
              {" "}
              {`${tripDuration.hours}`} hours and {`${tripDuration.minutes}`}{" "}
              minutes
            </span>
          </h3>
          <h3>
            Trip Distance: <span>{`${tripDistance}`} Km</span>
          </h3>
          <h3>
            tripPrice: <span>{`${tripPrice}`} EGP</span>{" "}
          </h3>
        </div>
      )}
    </div>
  );
}