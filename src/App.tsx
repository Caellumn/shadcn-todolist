import Layout from "./components/Layout";
import { ThemeProvider } from "./components/theme-provider";
import TodoList from "./components/TodoList";
import { Provider } from "react-redux";
import store from "./store";
import Form from "./components/Form";
import { useEffect } from "react";
import {
  fetchTodos,
  fetchTodosSuccess,
  fetchTodosFailure,
} from "./store/todosSlice";
import CategoriesDropdown from "./components/CategoriesDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Component to initialize data fetching
const TodoApp = () => {
  useEffect(() => {
    // Dispatch fetchTodos action to set loading state
    store.dispatch(fetchTodos());

    // Manually fetch the data
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        // Dispatch success action with the fetched data
        store.dispatch(fetchTodosSuccess(data));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        // Dispatch failure action if there was an error
        store.dispatch(fetchTodosFailure(errorMessage));
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Form />

      <div className="flex gap-2">
        <CategoriesDropdown />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button> all status</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <DropdownMenuItem>
              <button>all</button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button>completed</button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button>not completed</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <TodoList />
    </Layout>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <TodoApp />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
