import { RootState } from ".";

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

// INITIAL STATE
const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 5,
};

// ACTION TYPES
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_ITEMS_PER_PAGE = "SET_ITEMS_PER_PAGE";

// ACTION TYPE DEFINITIONS
type SetCurrentPageAction = {
  type: typeof SET_CURRENT_PAGE;
  payload: number;
};

type SetItemsPerPageAction = {
  type: typeof SET_ITEMS_PER_PAGE;
  payload: number;
};

// GROUP ACTION TYPES
type PaginationAction = SetCurrentPageAction | SetItemsPerPageAction;

// ACTION CREATORS
export const setCurrentPage = (page: number): SetCurrentPageAction => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setItemsPerPage = (count: number): SetItemsPerPageAction => ({
  type: SET_ITEMS_PER_PAGE,
  payload: count,
});

// REDUCER
const paginationReducer = (
  state = initialState,
  action: PaginationAction,
): PaginationState => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: action.payload,
        currentPage: 1,
      };
    default:
      return state;
  }
};

// SELECTORS
export const getCurrentPage = (state: RootState) =>
  state.pagination.currentPage;
export const getItemsPerPage = (state: RootState) =>
  state.pagination.itemsPerPage;
export const getTotalPages = (state: RootState) => {
  const totalItems = state.todos.todos.length;
  const itemsPerPage = state.pagination.itemsPerPage;
  return Math.ceil(totalItems / itemsPerPage);
};

export default paginationReducer;
