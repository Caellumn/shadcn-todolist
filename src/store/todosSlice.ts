import { RootState } from ".";
import { nanoid } from "nanoid";
import { Todo } from "@/types/types";

export interface TodoInput {
  text: string;
  category?: string;
  description?: string;
  completed?: boolean;
}

type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
};

//initial state
const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

//ACTION TYPES
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";
const TOGGLE_TODO = "TOGGLE_TODO";

// Action type definitions
type AddTodoAction = {
  type: typeof ADD_TODO;
  payload: Todo;
};

type RemoveTodoAction = {
  type: typeof REMOVE_TODO;
  payload: string;
};

type UpdateTodoAction = {
  type: typeof UPDATE_TODO;
  payload: { id: string; text: string };
};

type FetchTodosRequestAction = {
  type: typeof FETCH_TODOS_REQUEST;
};

type FetchTodosSuccessAction = {
  type: typeof FETCH_TODOS_SUCCESS;
  payload: Todo[];
};

type FetchTodosFailureAction = {
  type: typeof FETCH_TODOS_FAILURE;
  payload: string;
};

type ToggleTodoAction = {
  type: typeof TOGGLE_TODO;
  payload: string;
};

// Union type of all possible actions
type TodoAction =
  | AddTodoAction
  | RemoveTodoAction
  | UpdateTodoAction
  | FetchTodosRequestAction
  | FetchTodosSuccessAction
  | FetchTodosFailureAction
  | ToggleTodoAction;

//ACTION CREATORS
export const addTodo = (todoData: TodoInput): AddTodoAction => ({
  type: ADD_TODO,
  payload: {
    id: nanoid(),
    text: todoData.text,
    category: todoData.category || "",
    completed: todoData.completed || false,
    description: todoData.description || "",
  },
});

export const removeTodo = (id: string): RemoveTodoAction => ({
  type: REMOVE_TODO,
  payload: id,
});

export const updateTodo = (id: string, text: string): UpdateTodoAction => ({
  type: UPDATE_TODO,
  payload: { id, text },
});

// Fetch todos action creators
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

// Simple action creator for initiating the fetch
export const fetchTodos = (): FetchTodosRequestAction => ({
  type: FETCH_TODOS_REQUEST,
});

export const toggleTodo = (id: string): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  payload: id,
});

// REDUCER
const todosReducer = (state = initialState, action: TodoAction) => {
  //switch with all
  switch (action.type) {
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
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo,
        ),
      };
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
        error: null,
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
    default:
      return state;
  }
};

export const getTodos = (storeState: RootState) => storeState.todos.todos;

export default todosReducer;
