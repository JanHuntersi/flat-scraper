
import { CssBaseline } from "@mui/material";
import ChangeTheme from "./themes/CustomThemeProvider";
import Header from "./components/Header";
import EstateList from "./components/EstateList";
import EstateServiceProvider from "./service/EstateServiceProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EstateView from "./components/EstateView";

export default function App(){
  return(
    <BrowserRouter>
    <ChangeTheme>
    <CssBaseline />
    <EstateServiceProvider>
      <Header />
      <Routes>
          <Route path="/" element={<EstateList/>}></Route>
          <Route path="/estate/:id" element={<EstateView />}></Route>
      </Routes>
      </EstateServiceProvider>
    </ChangeTheme>
    </BrowserRouter>
  );
}
