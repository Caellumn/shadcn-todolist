import { createStore, combineReducers, applyMiddleware, compose, Middleware, AnyAction } from "redux";
import todosReducer from "@/store/todosSlice";
import statusReducer from "./statusSlice";
import categoryReducer from "./categoryFilterSlice";
import paginationReducer from "./paginationSlice";

// Define the window type for Redux DevTools Extension
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Define RootState type based on reducers
const rootReducer = combineReducers({
  todos: todosReducer,
  status: statusReducer,
  categoryFilter: categoryReducer,
  pagination: paginationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

// Define custom dispatch type that can accept thunk functions
export interface ThunkDispatch<S> {
  <R>(thunk: (dispatch: ThunkDispatch<S>, getState: () => S) => R): R;
  <A extends AnyAction>(action: A): A;
}

// Define AppThunk for async actions
export type AppThunk = (
  dispatch: ThunkDispatch<RootState>,
  getState: () => RootState
) => Promise<void> | void;

// Thunk middleware implementation
const thunk: Middleware = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action);
};

// Set up Redux DevTools
const composeEnhancers = 
  (typeof window !== 'undefined' && 
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

// Create the store with thunk middleware and DevTools
const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(thunk)) as any
);

// Export a properly typed dispatch
export type AppDispatch = ThunkDispatch<RootState>;

export default store;
