import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "reduxjs-toolkit-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theGameReducer from "./reducers";

const persistConfig = { key: "root", storage: AsyncStorage, backlist: ["theGameReducer"] };
const persistedReducer = persistReducer(persistConfig, theGameReducer);

const configure = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configure;
