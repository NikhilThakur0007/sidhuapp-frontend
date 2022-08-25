import { configureStore, applyMiddleware } from "@reduxjs/toolkit";

import rootReducer from "./slice/index";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "main-root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// const persistedReducer = persistReducer(rootReducer);
const store = configureStore({ reducer: persistedReducer }, applyMiddleware());

const Persistor = persistStore(store);

export { Persistor };

export default store;
