import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Playground from './components/Playground';
import Preview from './components/Preview';
import "./App.less";

function App() {
  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/playground/:playgroundId" element={<Playground />}>
              <Route path="template/:templateId" element={<Playground />} />
            </Route>
            <Route path="/preview/:previewId" element={<Preview />} />
          </Routes>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
