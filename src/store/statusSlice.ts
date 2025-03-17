import { RootState } from ".";

export type StatusFilter = "all" | "completed" | "active";

interface StatusState {
  filter: StatusFilter;
}

// INITIAL STATE
const initialState: StatusState = {
  filter: "all",
};

// ACTION TYPES
const SET_STATUS_FILTER = "SET_STATUS_FILTER";

// typeer de setstatusfiltre
type SetStatusFilterAction = {
  type: typeof SET_STATUS_FILTER;
  payload: StatusFilter;
};

// groupe like last time
type StatusAction = SetStatusFilterAction;

// ACTION CREATORS
export const setStatusFilter = (
  filter: StatusFilter,
): SetStatusFilterAction => ({
  type: SET_STATUS_FILTER,
  payload: filter,
});

// REDUCER
const statusReducer = (
  state = initialState,
  action: StatusAction,
): StatusState => {
  switch (action.type) {
    case SET_STATUS_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export const getStatusFilter = (state: RootState) => state.status.filter;

export default statusReducer;
