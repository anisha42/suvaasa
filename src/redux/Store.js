import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
const { createStore, applyMiddleware } = require("redux");
const { composeWithDevTools } = require("redux-devtools-extension");
const { default: thunk } = require("redux-thunk");
const { default: reducer } = require("./Reducer");

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

const persistor= persistStore(store);
export default {store, persistor};