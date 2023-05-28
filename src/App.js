/**
 * @author Gedeon Ndunde Gibango
 * @date 27/05/2023
 * @MyYouTubeChannel NdundeCode
 */

import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { store, persistor } from "./services/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { RoutedContent } from "./route";
import history from "./history";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <RoutedContent />
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;

