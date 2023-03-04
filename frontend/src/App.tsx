import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import {SegmentListView} from "./views/SegmentListView";
import {SegmentView} from "./views/SegmentView";

const theme = createTheme({});

const App = () => (
  <div className="App">
    <ThemeProvider theme={theme}>
      <Header />
        <Routes>
            <Route index element={<SegmentListView/>}/>
            <Route path="/segments/:id" element={<SegmentView/>}/>
        </Routes>
    </ThemeProvider>
  </div>
);

export default App;
