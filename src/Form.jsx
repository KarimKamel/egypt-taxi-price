import React from "react";
import TimePicker from "react-time-picker";

const submitButtonStyle = { backgroundColor: "rgb(160 16 16)" };

export default function Form(props) {
  const {
    setDestinationName,
    setDepartureTime,
    setOriginName,
    handleSubmit,
    originValue,
    destinationValue,
    destinationError,
    originError,
    routeNotFoundError,
    departureTimeError,
    departureTime,
    i18n,
    t,
  } = props;

  function getAlignment() {
    return { textAlign: i18n.language === "en" ? "left" : "right" };
  }

  return (
    <div className="col-12 col-md-8 col-lg-6 col-xl-6 text-left">
      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <h1 style={getAlignment()}>{t("form:title")}</h1>
            <p className="lead" style={getAlignment()}>
              {t("form:subtitle")}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col mt-4" style={getAlignment()}>
            <label htmlFor="originInput">{t("form:from")}</label>
            <input
              style={getAlignment()}
              id="originInput"
              type="text"
              onChange={e => setOriginName(e.target.value)}
              className="form-control"
              value={originValue}
              placeholder={t("form:origin")}
            />

            {originError && (
              <p style={{ color: "red", ...getAlignment() }}>
                {t("form:searchErrorMessage")}
              </p>
            )}
          </div>
        </div>
        <div className="row mt-4 " style={getAlignment()}>
          <div className="col">
            <label style={getAlignment()} htmlFor="destinationInput">
              {t("form:to")}
            </label>
            <input
              style={getAlignment()}
              id="destinationInput"
              type="text"
              onChange={e => setDestinationName(e.target.value)}
              className="form-control"
              value={destinationValue}
              placeholder={t("form:destination")}
            />
            {destinationError && (
              <p style={{ color: "red", ...getAlignment() }}>
                {t("form:searchErrorMessage")}
              </p>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col" style={getAlignment()}>
            <label className="m-0" htmlFor="departureTimeInput">
              {t("form:departure time")}
            </label>
            <br />
            <small className="mb-3 d-inline-block">
              {t("form:asterisk message")}
            </small>

            <TimePicker
              className="form-control"
              onChange={setDepartureTime}
              value={departureTime}
            />

            {departureTimeError && (
              <p style={{ color: "red", ...getAlignment() }}>
                {t("form:departureTimeErrorMessage")}
              </p>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col" style={getAlignment()}>
            <button
              style={submitButtonStyle}
              className="btn btn-dark submit-btn"
              type="submit">
              {t("form:submit")}
            </button>

            {routeNotFoundError && (
              <p style={{ color: "red" }}>{t("form:routeErrorMessage")}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
