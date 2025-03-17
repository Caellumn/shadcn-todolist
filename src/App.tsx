import Layout from "./components/Layout";
import { ThemeProvider } from "./components/theme-provider";
import Todo from "./components/Todo";
import { Provider } from "react-redux";
import store from "./store";
import Form from "./components/Form";
import { useEffect } from "react";
import { fetchTodos } from "./store/todoSlice";
import { useAppDispatch } from "./store/hooks";
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch todos when the app loads
    dispatch(fetchTodos());
  }, [dispatch]);

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
              <button>open</button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button>finished</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Todo />
    </Layout>
  );
};

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <TodoApp />
        </ThemeProvider>
      </Provider>
    </>
  );
};
export default App;
