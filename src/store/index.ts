import { createStore, combineReducers } from "redux";
import todosReducer from "@/store/todosSlice";

// Define the window type for Redux DevTools Extension
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => undefined;
  }
}

const rootReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Create the store
const store = createStore(
  rootReducer,
  // Add Redux DevTools Extension support if available
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? 
    window.__REDUX_DEVTOOLS_EXTENSION__() : 
    undefined
);

export default store;
