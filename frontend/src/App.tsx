import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pagesAll/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
