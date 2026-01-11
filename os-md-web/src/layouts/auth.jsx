import { Routes, Route } from "react-router-dom";
import routes from "@/routes";

export function Auth() {
  return (
    <div className="relative  w-full">
      <Routes>
        {routes.filter((ft)=> ft.token === false).map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
