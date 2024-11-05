import { Routes, Route } from "react-router-dom";

import { MAIN_ROUTES } from "@/constants/routes";
import MainLayout from "@/layouts/MainLayout";

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {MAIN_ROUTES.map(({ PATH, ELEMENT }) => (
          <Route key={PATH} path={PATH} element={<ELEMENT />} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
