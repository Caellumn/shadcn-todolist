import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { RootState } from ".";

export interface Todo {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  description: string;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export interface TodoInput {
  text: string;
  category: string;
  description: string;
  completed?: boolean;
}

// thunk to fetch
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  },
);

// thunk to add
export const addTodoToDb = createAsyncThunk(
  "todos/addTodoToDb",
  async (todoData: TodoInput, { rejectWithValue }) => {
    try {
      const newTodo = {
        id: nanoid(),
        text: todoData.text,
        category: todoData.category || "",
        completed: todoData.completed || false,
        description: todoData.description || "",
      };

      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  },
);

// thunk to toggle
export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;

      const todo = state.todoSlice.todos.find((todo) => todo.id === id);

      if (!todo) {
        throw new Error("Todo not found");
      }

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle todo");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error",
      );
    }
  },
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      },
      prepare: (todoData: TodoInput) => ({
        payload: {
          id: nanoid(),
          text: todoData.text,
          category: todoData.category || "",
          completed: todoData.completed || false,
          description: todoData.description || "",
        },
      }),
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Unknown error";
      })
      .addCase(addTodoToDb.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodoToDb.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addTodoToDb.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Unknown error";
      })
      .addCase(toggleTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.completed = !todo.completed;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Unknown error";
      });
  },
});

export const { addTodo } = todoSlice.actions;

export const getTodos = (state: RootState) => state.todoSlice.todos;

export default todoSlice.reducer;
