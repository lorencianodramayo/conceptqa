import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import "./App.less";

function App() {
  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
