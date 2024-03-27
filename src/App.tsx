import { ThemeProvider } from "@mui/material";
import DataVizualizer from "./components/data-visualizer";
import theme from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <DataVizualizer />
      </ThemeProvider>
      ;
    </>
  );
}

export default App;
