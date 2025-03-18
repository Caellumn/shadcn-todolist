import { RootState } from ".";
import { AppThunk } from "./index";
import { Dispatch, AnyAction } from "redux";

export type CategoryFilter = string;

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoryState {
  filter: CategoryFilter;
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  filter: "",
  categories: [],
  loading: false,
  error: null,
};

// Action types
const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER";
const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";

// Action type definitions
type SetCategoryFilterAction = {
  type: typeof SET_CATEGORY_FILTER;
  payload: CategoryFilter;
};

type FetchCategoriesRequestAction = {
  type: typeof FETCH_CATEGORIES_REQUEST;
};

type FetchCategoriesSuccessAction = {
  type: typeof FETCH_CATEGORIES_SUCCESS;
  payload: Category[];
};

type FetchCategoriesFailureAction = {
  type: typeof FETCH_CATEGORIES_FAILURE;
  payload: string;
};

type CategoryAction = 
  | SetCategoryFilterAction 
  | FetchCategoriesRequestAction
  | FetchCategoriesSuccessAction
  | FetchCategoriesFailureAction;

// Action creators
export const setCategoryFilter = (
  filter: CategoryFilter,
): SetCategoryFilterAction => ({
  type: SET_CATEGORY_FILTER,
  payload: filter,
});

export const fetchCategoriesRequest = (): FetchCategoriesRequestAction => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories: Category[]): FetchCategoriesSuccessAction => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error: string): FetchCategoriesFailureAction => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

// Thunk action creator for fetching categories
export const fetchCategories = (): AppThunk => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(fetchCategoriesRequest());
    const response = await fetch("https://shrub-ring-editor.glitch.me/categories");
    
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    
    const data = await response.json();
    dispatch(fetchCategoriesSuccess(data));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
};

// Reducer
const categoryReducer = (state = initialState, action: CategoryAction) => {
  switch (action.type) {
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Selectors
export const getCategoryFilter = (state: RootState) => state.categoryFilter.filter;
export const getCategories = (state: RootState) => state.categoryFilter.categories;
export const getCategoriesLoading = (state: RootState) => state.categoryFilter.loading;
export const getCategoriesError = (state: RootState) => state.categoryFilter.error;

export default categoryReducer;
