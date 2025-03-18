import Layout from "./components/Layout";
import { ThemeProvider } from "./components/theme-provider";
import TodoList from "./components/TodoList";
import { Provider } from "react-redux";
import store from "./store";
import Form from "./components/Form";
import FiltertButtons from "./components/FiltertButtons";
import ShowPerPage from "./components/ShowPerPage";
import Pagination from "./components/Pagination";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Layout>
          <Form />
          <FiltertButtons />
          <TodoList />
          <div className="mt-6 flex items-center justify-between">
            <ShowPerPage />
            <Pagination />
          </div>
          <hr className="h-1 w-full bg-gray-500" />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
