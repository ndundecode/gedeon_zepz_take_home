/**
 * @author Gedeon Ndunde Gibango
 * @date 27/05/2023
 * @MyYouTubeChannel NdundeCode
 */

import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import rootReducer from "../../redux/reducers";
import reduxThunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "my-super-secret-key",
      onError: function (error) {
        console.log(error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);
const persistor = persistStore(store);

export { store, persistor };
