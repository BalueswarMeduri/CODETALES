import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/user/user.slice';
import storageSession from 'redux-persist/lib/storage/session'; // ✅ Corrected import
import persistStore from 'redux-persist/es/persistStore';
import { persistReducer } from 'redux-persist'; // ✅ Added missing import

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: storageSession, // ✅ Use the correct session storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ serializableCheck: false }), // ✅ Fixed middleware return
});

export const persistor = persistStore(store);
