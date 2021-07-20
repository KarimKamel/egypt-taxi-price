import React from "react";
import About from "./About";
import Team from "./Team";
import Contact from "./Contact";
import Header from "./Header";
import ContentContainer from "./ContentContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/team">
          <Team />
        </Route>
        <Route path="/">
          <ContentContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default React.memo(App);
