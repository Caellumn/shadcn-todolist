import Layout from "./components/Layout";
import { ThemeProvider } from "./components/theme-provider";
const App = () => {
  return (
    <>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </>
  );
};
export default App;
