import React from "react";
import "./TripInfo.css";

export default function TripInfo(props) {
  const { tripDuration, tripDistance, tripPrice } = props;
  return (
    <div class="col-12 col-md-8 col-lg-6 col-xl-6 text-left">
      {tripDistance !== 0 && (
        <div className="trip-info-container">
          <h3 className="mt-3">
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