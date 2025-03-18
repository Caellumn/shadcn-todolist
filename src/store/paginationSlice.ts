import { RootState } from ".";

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalFilteredItems: number;
}

// INITIAL STATE
const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 5,
  totalFilteredItems: 0,
};

// ACTION TYPES
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_ITEMS_PER_PAGE = "SET_ITEMS_PER_PAGE";
// set a total for the total pages
const SET_TOTAL_FILTERED_ITEMS = "SET_TOTAL_FILTERED_ITEMS";

// ACTION TYPE DEFINITIONS
type SetCurrentPageAction = {
  type: typeof SET_CURRENT_PAGE;
  payload: number;
};

type SetItemsPerPageAction = {
  type: typeof SET_ITEMS_PER_PAGE;
  payload: number;
};

type SetTotalFilteredItemsAction = {
  type: typeof SET_TOTAL_FILTERED_ITEMS;
  payload: number;
};

// GROUP ACTION TYPES
type PaginationAction =
  | SetCurrentPageAction
  | SetItemsPerPageAction
  | SetTotalFilteredItemsAction;

// ACTION CREATORS
export const setCurrentPage = (page: number): SetCurrentPageAction => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});

export const setItemsPerPage = (count: number): SetItemsPerPageAction => ({
  type: SET_ITEMS_PER_PAGE,
  payload: count,
});

export const setTotalFilteredItems = (
  count: number,
): SetTotalFilteredItemsAction => ({
  type: SET_TOTAL_FILTERED_ITEMS,
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
    case SET_TOTAL_FILTERED_ITEMS: {
      // round up to make sure we got enough pages
      const totalPages = Math.ceil(action.payload / state.itemsPerPage);
      return {
        ...state,
        totalFilteredItems: action.payload,
        // Adjust current page if it's beyond the new total pages
        currentPage:
          state.currentPage > totalPages && totalPages > 0
            ? totalPages
            : state.currentPage,
      };
    }
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
  const totalItems = state.pagination.totalFilteredItems;
  const itemsPerPage = state.pagination.itemsPerPage;
  return Math.max(1, Math.ceil(totalItems / itemsPerPage));
};

export default paginationReducer;
