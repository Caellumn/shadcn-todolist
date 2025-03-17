import Layout from "./components/Layout";
import { ThemeProvider } from "./components/theme-provider";
import TodoList from "./components/TodoList";
import { Provider } from "react-redux";
import store from "./store";
import Form from "./components/Form";
import FiltertButtons from "./components/FiltertButtons";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Layout>
          <Form />
          <FiltertButtons />
          <TodoList />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
