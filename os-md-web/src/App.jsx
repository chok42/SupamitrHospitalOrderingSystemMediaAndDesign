import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ContextState from "./context/ContextState";
import MyContext from "./context/MyContext";
import { getStorage } from "./helpers/contents";
import SpinnerLoader from "./components/SpinerLoader";
import { useMemo } from "react";
import { GetByIdEmployeeService } from "./services/employee.service";
import routes from "./routes";

function App() {
  const state = ContextState();
  const store = { ...state };

  const token = getStorage("empId");
  const empRole = getStorage("empRole");
  const checkToken = token && token !== undefined ? true : false;

  useMemo(async () => {
    if (checkToken) {
      state.setLoader(true);
      const resp = await GetByIdEmployeeService(token);
      state.setDataEmp(resp);
      state.setLoader(false);
    } else {
    }
  }, []);

  const handleChangeRoutes = (check) => {
    if (checkToken) {
      const ftr = routes.find((ft) => ft.token === true && ft.role === empRole);
      return (
        <Routes>
          <Route path={`/dashboard/*`} element={<Dashboard />} />
          <Route
            path="/*"
            element={<Navigate to="/dashboard/home" replace />}
          />
          {ftr.pages.map((iPA, idx2) => (
            <Route key={idx2}>
              <Route path={`/dashboard/${iPA.path}`} element={iPA.element} />
            </Route>
          ))}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      );
    } else {
      const ftr = routes.find((ft) => ft.token === false);
      return (
        <Routes>
          <Route path={`/auth/*`} element={<Auth />} />
          <Route path="/*" element={<Navigate to="/auth/sign-in" replace />} />
          {ftr.pages.map((iPA, idx2) => (
            <Route key={idx2}>
              <Route path={`/auth/${iPA.path}`} element={iPA.element} />
            </Route>
          ))}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      );
    }
  };


  return (
    <>
      <MyContext.Provider value={store}>
        {handleChangeRoutes(checkToken)}
        {state.loader && <SpinnerLoader />}
      </MyContext.Provider>
    </>
  );
}

export default App;
