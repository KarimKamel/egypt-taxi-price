import { useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import Forms04 from "./Forms04";
import Gmap from "./Gmap";
import TripInfo from "./TripInfo";
import { useTranslation } from "react-i18next";

import { calculateFare, calculateTime } from "./utils/utils";

export default function ContentContainer() {
  const { t, i18n } = useTranslation();

  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [center, setCenter] = useState({ lat: 30, lng: 31 }); //cairo
  const [originCoords, setOriginCoords] = useState();
  const [destinationCoords, setDestinationCoords] = useState();
  const [tripPrice, setTripPrice] = useState(0);
  const [tripDuration, setTripDuration] = useState({ hours: 0, minutes: 0 });
  const [tripDistance, setTripDistance] = useState(0);
  const [departureTime, setDepartureTime] = useState(new Date());

  const [geocoder, setGeocoder] = useState(null);
  const [service, setService] = useState(null);

  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   language: "en",
  //   googleMapsApiKey: "AIzaSyCeDbzkBUMghS9nQtS0fVySysUxKNDkYyo",
  // });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCeDbzkBUMghS9nQtS0fVySysUxKNDkYyo",
    language: "en",
  });

  const [originErrorMessage, setOriginErrorMessage] = useState(false);
  const [destinationErrorMessage, setDestinationErrorMessage] = useState(false);
  const [routeNotFoundError, setRouteNotFoundError] = useState(false);
  const [showTripInfo, setShowTripInfo] = useState(false);

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    console.log(map);

    setMap(map);
    var geocoder = new window.google.maps.Geocoder();
    var service = new window.google.maps.DistanceMatrixService();
    setGeocoder(geocoder);
    setService(service);
  }, []);
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  async function getTripData(originName, destinationName) {
    //if departure time has been changed by the user it will be returned in string formatted
    //in that case make a new date object with departure time and make sure departure time is not in the past
    //else create a new date object and use that as departure time
    var departureDate = new Date();
    if (departureTime && typeof departureTime === "string") {
      const splitTime = departureTime.split(":");

      departureDate.setHours(splitTime[0]);
      departureDate.setMinutes(splitTime[1]);
      console.log(departureDate);
      if (departureDate < new Date()) {
        departureDate = new Date();
      }
    }

    const request = {
      origins: [originName],
      destinations: [destinationName],
      travelMode: window.google.maps.TravelMode.DRIVING,
      unitSystem: window.google.maps.UnitSystem.METRIC,
      drivingOptions: {
        departureTime: departureDate,
      },
      avoidHighways: false,
      avoidTolls: false,
    };
    var response;
    try {
      response = await service.getDistanceMatrix(request);
    } catch (error) {
      console.log(error);
    }
    const originFormattedName = response.originAddresses[0];
    const destinationFormattedName = response.destinationAddresses[0];
    const status = response.rows[0].elements[0].status;
    var distanceInMeters;
    var durationInSeconds;
    if (status === "OK") {
      distanceInMeters = response.rows[0].elements[0].distance.value;
      console.log("distance:", response.rows[0].elements[0].distance.text);
      durationInSeconds = response.rows[0].elements[0].duration.value;
      console.log("duration:", response.rows[0].elements[0].duration.text);
    }

    return {
      status,
      distanceInMeters,
      durationInSeconds,
      originFormattedName,
      destinationFormattedName,
    };
  }
  async function geocodeLocations(
    originFormattedName,
    destinationFormattedName
  ) {
    const originValues = await geocoder.geocode({
      address: originFormattedName,
    });
    const destinationValues = await geocoder.geocode({
      address: destinationFormattedName,
    });
    const _originCoords = originValues.results[0].geometry.location;
    const _destinationCoords = destinationValues.results[0].geometry.location;
    return { _originCoords, _destinationCoords };
  }

  function makeTripInfo(
    originFormattedName,
    destinationFormattedName,

    distanceInMeters,
    durationInSeconds
  ) {
    const _tripPrice = calculateFare(distanceInMeters, durationInSeconds);

    //convert trip time to hours and minutes

    const { hours, minutes } = calculateTime(durationInSeconds);

    //set trip distance in state

    setTripDistance(distanceInMeters / 1000);

    //set trip duration in state

    setTripDuration({ hours, minutes });

    //set trip price in state

    setTripPrice(_tripPrice);
    setDestinationName(destinationFormattedName);
    setOriginName(originFormattedName);
    setShowTripInfo(true);
  }

  const handleSubmit = async e => {
    e.preventDefault();

    //get trip duration, distance, origin and destination formatted names

    const {
      status,
      distanceInMeters,
      durationInSeconds,
      originFormattedName,
      destinationFormattedName,
    } = await getTripData(originName, destinationName);

    if (status === "OK") {
      makeTripInfo(
        originFormattedName,
        destinationFormattedName,
        distanceInMeters,
        durationInSeconds
      );
    } else if (status === "ZERO_RESULTS") {
      setRouteNotFoundError(true);
      setShowTripInfo(false);
      setOriginErrorMessage(false);
      setDestinationErrorMessage(false);

      setDestinationName(destinationFormattedName);
      setOriginName(originFormattedName);
    } else {
      setRouteNotFoundError(false);
      setShowTripInfo(false);
      if (destinationFormattedName)
        setDestinationName(destinationFormattedName);
      else setDestinationErrorMessage(true);
      if (originFormattedName) setOriginName(originFormattedName);
      else setOriginErrorMessage(true);
    }

    //get origin and destination coords from their name (aka geocode)
    try {
      const { _originCoords, _destinationCoords } = await geocodeLocations(
        originFormattedName,
        destinationFormattedName
      );

      //set origin and destination coords in state and pass them to markers as this.props

      setOriginCoords(_originCoords);
      setDestinationCoords(_destinationCoords);

      //fit map bounds to display origin and destination

      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(_originCoords);
      bounds.extend(_destinationCoords);
      map.fitBounds(bounds);

      //adjust zoom to show both markers

      map.setZoom(map.getZoom() - 1);
    } catch (error) {
      console.log(error);
    }
  };
  const onOriginDragEnd = async e => {
    const {
      distanceInMeters,
      durationInSeconds,
      originFormattedName,
      destinationFormattedName,
    } = await getTripData(e.latLng, destinationName);
    console.log("from: ", originFormattedName);
    console.log("to: ", destinationFormattedName);
    makeTripInfo(
      originFormattedName,
      destinationFormattedName,
      distanceInMeters,
      durationInSeconds
    );
  };
  const onDestinationDragEnd = async e => {
    const {
      distanceInMeters,
      durationInSeconds,
      originFormattedName,
      destinationFormattedName,
    } = await getTripData(originName, e.latLng);
    console.log("from: ", originFormattedName);
    console.log("to: ", destinationFormattedName);
    makeTripInfo(
      originFormattedName,
      destinationFormattedName,
      distanceInMeters,
      durationInSeconds
    );

    //get trip fare based on duration and distance
  };
  return (
    <section className="fdb-block py-0 mt-4">
      <div
        className="container"
        style={{ backgroundImage: "url(imgs/shapes/6.svg)" }}>
        <div className="row">
          <Forms04
            handleSubmit={handleSubmit}
            originValue={originName}
            destinationValue={destinationName}
            setOriginName={setOriginName}
            setDestinationName={setDestinationName}
            setDepartureTime={setDepartureTime}
            destinationError={destinationErrorMessage}
            originError={originErrorMessage}
            routeNotFoundError={routeNotFoundError}
            departureTime={departureTime}
            i18n={i18n}
            primary={true}
            t={t}
          />

          {isLoaded && (
            <Gmap
              center={center}
              onLoad={onLoad}
              onUnmount={onUnmount}
              originPosition={originCoords}
              destinationPosition={destinationCoords}
              onOriginDragEnd={onOriginDragEnd}
              onDestinationDragEnd={onDestinationDragEnd}>
              {showTripInfo && (
                <TripInfo
                  tripPrice={tripPrice}
                  tripDistance={tripDistance}
                  tripDuration={tripDuration}
                />
              )}
            </Gmap>
          )}
        </div>
      </div>
    </section>
  );
}
