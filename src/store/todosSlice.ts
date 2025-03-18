import { AppThunk, RootState } from ".";

export interface Todo {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  category?: string;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// Action types
export const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const UPDATE_TODO_DESCRIPTION = "UPDATE_TODO_DESCRIPTION";

// Action type definitions
export interface FetchTodosRequestAction {
  type: typeof FETCH_TODOS_REQUEST;
}

export interface FetchTodosSuccessAction {
  type: typeof FETCH_TODOS_SUCCESS;
  payload: Todo[];
}

export interface FetchTodosFailureAction {
  type: typeof FETCH_TODOS_FAILURE;
  payload: string;
}

export interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: Todo;
}

export interface RemoveTodoAction {
  type: typeof REMOVE_TODO;
  payload: string;
}

export interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: string;
}

export interface UpdateTodoDescriptionAction {
  type: typeof UPDATE_TODO_DESCRIPTION;
  payload: {
    id: string;
    description: string;
  };
}

export type TodoAction =
  | FetchTodosRequestAction
  | FetchTodosSuccessAction
  | FetchTodosFailureAction
  | AddTodoAction
  | RemoveTodoAction
  | ToggleTodoAction
  | UpdateTodoDescriptionAction;

// Action creators
export const fetchTodosRequest = (): FetchTodosRequestAction => ({
  type: FETCH_TODOS_REQUEST,
});

export const fetchTodosSuccess = (todos: Todo[]): FetchTodosSuccessAction => ({
  type: FETCH_TODOS_SUCCESS,
  payload: todos,
});

export const fetchTodosFailure = (error: string): FetchTodosFailureAction => ({
  type: FETCH_TODOS_FAILURE,
  payload: error,
});

export const addTodo = (todo: Todo): AddTodoAction => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = (id: string): RemoveTodoAction => ({
  type: REMOVE_TODO,
  payload: id,
});

export const toggleTodo = (id: string): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const updateTodoDescription = (
  id: string,
  description: string,
): UpdateTodoDescriptionAction => ({
  type: UPDATE_TODO_DESCRIPTION,
  payload: {
    id,
    description,
  },
});

// Async action creators (thunks)
export const fetchTodos = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchTodosRequest());
    const response = await fetch("https://shrub-ring-editor.glitch.me/todos");

    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const data = await response.json();
    dispatch(fetchTodosSuccess(data));
  } catch (error) {
    dispatch(fetchTodosFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
};

export const addTodoAsync = (text: string, category?: string): AppThunk => async (dispatch) => {
  try {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      description: "",
      category,
    };

    // In a real app, you would save this to your API
    // For now, we're just adding it to the Redux store
    dispatch(addTodo(newTodo));
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export const toggleTodoAsync = (id: string): AppThunk => async (dispatch, getState) => {
  try {
    const state = getState();
    const todo = state.todos.todos.find((t) => t.id === id);

    if (!todo) {
      throw new Error("Todo not found");
    }

    // Update the todo in the API
    const response = await fetch(`https://shrub-ring-editor.glitch.me/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    // If API update successful, update the Redux store
    dispatch(toggleTodo(id));
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
};

export const updateTodoDescriptionAsync = (id: string, description: string): AppThunk => async (dispatch) => {
  try {
    // Make API call to update description
    const response = await fetch(`https://shrub-ring-editor.glitch.me/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo description");
    }
    
    // Update the Redux store if API call was successful
    dispatch(updateTodoDescription(id, description));
  } catch (error) {
    console.error("Error updating todo description:", error);
  }
};

export const removeTodoAsync = (id: string): AppThunk => async (dispatch) => {
  try {
    // Make API call to delete todo
    const response = await fetch(`https://shrub-ring-editor.glitch.me/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }

    // Update Redux store if API call was successful
    dispatch(removeTodo(id));
  } catch (error) {
    console.error("Error removing todo:", error);
  }
};

// Reducer
const todosReducer = (state = initialState, action: TodoAction): TodoState => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case UPDATE_TODO_DESCRIPTION:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, description: action.payload.description }
            : todo,
        ),
      };
    default:
      return state;
  }
};

// Selectors
export const getTodos = (state: RootState) => state.todos.todos;
export const getTodosLoading = (state: RootState) => state.todos.loading;
export const getTodosError = (state: RootState) => state.todos.error;

export default todosReducer;
