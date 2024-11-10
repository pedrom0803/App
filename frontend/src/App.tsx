import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientHomePage from "./pagesClient/ClientHomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<ClientHomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
