import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import templateReducer from "./reducers/template";
import counterReducer from "./reducers/counter";
import dynamicElementsReducer from './reducers/dynamicElements';
import sidePanelReducer from "./reducers/sidePanel";
import imageViewReducer from "./reducers/imageView";
import caseViewReducer from "./reducers/caseView";
import objectDynamicReducer from './reducers/objectDynamic';
import playPauseReducer from './reducers/playPause';
import imageListReducer from './reducers/imageList';
import creativeTimeReducer from './reducers/creativeTime';

const store = configureStore({
  reducer: {
    template: templateReducer,
    counter: counterReducer,
    dynamicElements: dynamicElementsReducer,
    sidePanel: sidePanelReducer,
    imageView: imageViewReducer,
    caseView: caseViewReducer,
    objectDynamic: objectDynamicReducer,
    playPause: playPauseReducer,
    imageList: imageListReducer,
    creativeTime: creativeTimeReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
