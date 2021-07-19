import React from "react";

export default function About() {
  return (
    <div>
      {console.log("rendering About")}
      <div className="container">
        <h1>Calculate taxi fares in Egypt</h1>
        <p>
          Best thing about taxis in Egypt is that they are supposed to be fairly
          cheap. Unluckily a lot of the times when taking a taxi, the taxi
          driver won't turn on the taximeter (device used to calculate pasenger
          fares) at the beggining of the trip, and once arrived to the
          destination they will go ahead and overcharge the passenger, who at
          this point has no way of establishing the real price of the trip.{" "}
        </p>
        <p>
          This small web app aims at solving exactly this problem by allowing
          you to get a very accurate estimate of how much you should be paying
          based on the distance and duration of a trip. The app works by doing
          the same math that the taximeter would have done. All the parameters
          used are based on data released by the ministry of transportation in
          Egypt.
        </p>
        <p>The formula used is the following:</p>
        <ul>
          <li>Initial Fare: 7 EGP </li>
          <li>First Kilometer is free then for every extra Km: 3 EGP </li>
          <li>the first hour is: 17 EGP</li>
          <li>every subsequent hour is: 8 EGP</li>
        </ul>
        <p>So for example a 2km trip that lasts 6 min would be: </p>
        <code>7EGP+(1*3EGP)+ (10%*17EGP) = 11.7 EGP</code>
        <br />
        <br />

        <p>So for example a 20km trip that lasts 2 hours would be: </p>
        <code>
          (7EGP for the initial fare + first kilometer) + (19*3EGP for the
          following 19 kilometers) + (17EGP for the first hour) + (8EGP for the
          second hour) = 89EGP
        </code>
      </div>
    </div>
  );
}
