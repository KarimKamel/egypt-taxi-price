import React from "react";

export default function Header() {
  return (
    <header>
      <div class="container">
        <nav class="navbar navbar-expand-md no-gutters">
          <div class="col-2 text-left">
            <a href="https://www.froala.com">
              <img src="./imgs/logo.png" height="30" alt="image" />
            </a>
          </div>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav4"
            aria-controls="navbarNav4"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse justify-content-center col-md-8"
            id="navbarNav4">
            <ul class="navbar-nav justify-content-center">
              <li class="nav-item active">
                <a class="nav-link" href="https://www.froala.com">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">
                  Pricing
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.froala.com">
                  Team
                </a>
              </li>
            </ul>
          </div>

          <ul class="navbar-nav col-2 justify-content-end d-none d-md-flex">
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">
                <i class="fab fa-github"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://www.froala.com">
                <i class="fab fa-google"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
