// App.jsx

import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import "./index.css"

const App = () => {
  return (
    <MainLayout>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

      </Routes>

    </MainLayout>
  );
};

export default App;