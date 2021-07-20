import { useJsApiLoader } from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import Form from "./Form";
import Gmap from "./Gmap";
import TripInfo from "./TripInfo";
import { useTranslation } from "react-i18next";

import { calculateFare, calculateTime } from "./utils/utils";
var scrollIntoView = require("scroll-into-view");

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

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    language: "en",
    googleMapsApiKey: "AIzaSyCeDbzkBUMghS9nQtS0fVySysUxKNDkYyo",
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
    //if departure time has been changed by the user it will be returned in string format
    //if so, create a new date object with departure time and make sure departure time is not in the past
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

    //create a distanceMatrix service request using origin name, destination name and departure time

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

    //call distance matrix service

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
      console.log("distance text:", response.rows[0].elements[0].distance.text);
      durationInSeconds = response.rows[0].elements[0].duration.value;
      console.log("duration text:", response.rows[0].elements[0].duration.text);
    }

    return {
      status,
      distanceInMeters,
      durationInSeconds,
      originFormattedName,
      destinationFormattedName,
    };
  }

  //geocode location converts location formatted names into coords

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

  //fill in the fields that make up the trip info banner
  //show the trip info banner

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
    setRouteNotFoundError(false);
    setOriginErrorMessage(false);
    setDestinationErrorMessage(false);
    e.preventDefault();

    //get trip duration, distance, origin and destination formatted names using distance matrix service
    try {
      const {
        status,
        distanceInMeters,
        durationInSeconds,
        originFormattedName,
        destinationFormattedName,
      } = await getTripData(originName, destinationName);

      if (status === "OK") {
        //if distance matrix service does not return any error, fill in
        //the fields making up the trip info banner and show the trip info banner
        makeTripInfo(
          originFormattedName,
          destinationFormattedName,
          distanceInMeters,
          durationInSeconds
        );
      } else if (status === "ZERO_RESULTS") {
        //zero results means no route connecting origin and destination was found
        //show error message accordingly

        setRouteNotFoundError(true);
        setShowTripInfo(false);
        setOriginErrorMessage(false);
        setDestinationErrorMessage(false);

        setDestinationName(destinationFormattedName);
        setOriginName(originFormattedName);
      } else {
        //if execution reaches this point it means origin or destination were not found
        //show error message accordingly
        setRouteNotFoundError(false);
        setShowTripInfo(false);
        if (destinationFormattedName)
          setDestinationName(destinationFormattedName);
        else setDestinationErrorMessage(true);
        if (originFormattedName) setOriginName(originFormattedName);
        else setOriginErrorMessage(true);
      }

      //get origin and destination coords from their name using geocode service.

      const { _originCoords, _destinationCoords } = await geocodeLocations(
        originFormattedName,
        destinationFormattedName
      );

      //set origin and destination coords in state and pass them to markers as props

      setOriginCoords(_originCoords);
      setDestinationCoords(_destinationCoords);

      //fit map bounds to display origin and destination

      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(_originCoords);
      bounds.extend(_destinationCoords);
      map.fitBounds(bounds);

      //adjust zoom to show both markers

      map.setZoom(map.getZoom() - 1);
      console.log(document.getElementById("target"));
      scrollIntoView(document.querySelector("#target"));
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
      {loadError && (
        <p class="text-danger text-text-center">
          Error loading google maps api. Try refreshing the page.
        </p>
      )}
      <div
        className="container"
        style={{ backgroundImage: "url(imgs/shapes/6.svg)" }}>
        <div className="row">
          <Form
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
                  id="#tripInfo"
                  tripPrice={tripPrice}
                  tripDistance={tripDistance}
                  tripDuration={tripDuration}
                />
              )}
            </Gmap>
          )}
          <div id="target"></div>
        </div>
      </div>
    </section>
  );
}
