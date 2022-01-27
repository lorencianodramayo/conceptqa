import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Playground from './components/Playground';
import "./App.less";

function App() {
  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/playground/:playgroundId" element={<Playground />}>
              <Route
                path="/playground/:playgroundId/template/:templateId"
                element={<Playground />}
              />
            </Route>
          </Routes>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
