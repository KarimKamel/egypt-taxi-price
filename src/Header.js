import React, { useState } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const location = useLocation();
  // const { t, i18n } = useTranslation(["translation", "header"]);
  const { t, i18n } = useTranslation();
  const [doTranslation, setDoTranslation] = useState(false);
  function getFlexFLow() {
    return { flexFlow: `${i18n.language === "ar" ? "row-reverse" : ""}` };
  }

  const onLanguageChange = event => {
    if (event.target.checked === false) {
      console.log("in false");
      setDoTranslation(false);
      i18n.changeLanguage("en");
    } else {
      console.log("in true");
      setDoTranslation(true);
      i18n.changeLanguage("ar");
    }
  };
  //   <p>{t("introduction")}</p>
  //   {/* <Trans i18nKey="subtext" count={1}></Trans> */}
  // </div>
  return (
    <header>
      {/* <p>{t("home")}</p> */}

      <div className="container ">
        <nav
          className="navbar navbar-expand-md no-gutters"
          style={getFlexFLow()}>
          <div className="col-3 text-left">
            <h3 className="logo">Egypt Taxi Price</h3>
          </div>

          {/* <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav4"
            aria-controls="navbarNav4"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}

          <div
            className="collapse navbar-collapse justify-content-center col-md-5 "
            style={{ flexGrow: "0" }}
            id="navbarNav4">
            <ul
              className="navbar-nav justify-content-center "
              style={getFlexFLow()}>
              <li
                className={`nav-item ${
                  location.pathname === "/" ? "active" : ""
                }`}>
                <Link className="nav-link " to="/">
                  {t("header:home")}
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/about" ? "active" : ""
                }`}>
                <Link className="nav-link" to="/about">
                  {t("header:about")}
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "contact" ? "active" : ""
                }`}>
                <Link className="nav-link" to="/Contact">
                  {t("header:contact")}
                </Link>
              </li>
              <li
                className={`nav-item ${
                  location.pathname === "/team" ? "active" : ""
                }`}>
                <Link className="nav-link" to="/team">
                  {t("header:team")}
                </Link>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav col-2  d-none d-md-flex mr-4">
            <li className="nav-item">
              <a className="nav-link" href="https://www.froala.com">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.froala.com">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.froala.com">
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.froala.com">
                <i className="fab fa-google"></i>
              </a>
            </li>
          </ul>
          <div class="custom-control custom-switch d-flex flex-row ">
            <div class="form-check form-switch language-switch">
              <label
                class="form-check-label"
                for="flexSwitchCheckDefault"
                style={{ marginRight: "3rem" }}>
                english
              </label>
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onChange={onLanguageChange}
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                arabic
              </label>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
