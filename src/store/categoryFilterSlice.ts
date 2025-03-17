import { RootState } from ".";

export type CategoryFilter = string;

interface CategoryState {
  filter: CategoryFilter;
}

const initialState: CategoryState = {
  filter: "",
};

const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER";

type SetCategoryFilterAction = {
  type: typeof SET_CATEGORY_FILTER;
  payload: CategoryFilter;
};

type CategoryAction = SetCategoryFilterAction;

export const setCategoryFilter = (
  filter: CategoryFilter,
): SetCategoryFilterAction => ({
  type: SET_CATEGORY_FILTER,
  payload: filter,
});

const categoryReducer = (state = initialState, action: CategoryAction) => {
  switch (action.type) {
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export const getCategoryFilter = (state: RootState) => state.categoryFilter.filter;

export default categoryReducer;
