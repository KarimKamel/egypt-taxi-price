import React, { Component } from "react";

export default function Forms04(props) {
  const { setDestinationName, setOriginName, handleSubmit } = props;
  return (
    <div className="col-12 col-md-8 col-lg-6 col-xl-6 text-left">
      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <h1>Taxi fare prices?</h1>
            <p className="lead">
              Enter your departure and arrival locations below and get the exact
              amount you should be paying.{" "}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col mt-4">
            <label htmlFor="originInput">from:</label>
            <input
              id="originInput"
              type="text"
              onChange={e => setOriginName(e.target.value)}
              className="form-control"
              placeholder="origin"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <label htmlFor="destinationInput">to:</label>
            <input
              id="destinationInput"
              type="text"
              onChange={e => setDestinationName(e.target.value)}
              className="form-control"
              placeholder="destination"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
