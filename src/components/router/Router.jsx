import { Route, Routes } from "react-router-dom";

import Game from "../pages/Game";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="game" element={<Game />} />
      </Route>
    </Routes>
  );
}

export default Router;
