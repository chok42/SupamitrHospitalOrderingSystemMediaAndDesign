import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ContextState from "./context/ContextState";
import MyContext from "./context/MyContext";
import { getStorage } from "./helpers/contents";
import NotFound from "./pages/NotFound";
import SpinnerLoader from "./components/SpinerLoader";
import { useMemo } from "react";
import { GetByIdEmployeeService } from "./services/employee.service";

function App() {
  const state = ContextState();
  const store = { ...state };

  const token = getStorage("empId");
  useMemo(async () => {
    if (token && token !== undefined) {
      state.setLoader(true)
      const resp = await GetByIdEmployeeService(token);
      state.setDataEmp(resp);
      state.setLoader(false)
    }
  }, []);
  return (
    <>
      <MyContext.Provider value={store}>
        {token && token !== undefined ? (
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route
              path="*"
              element={<Navigate to="/dashboard/home" replace />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/auth/*" element={<Auth />} />
            <Route
              path="*"
              element={<Navigate to="/auth/sign-in" replace />}
            />
             {/* <Route path="/auth/sign-in/*" element={<NotFound />} /> */}
     
          </Routes>
        )}
        {state.loader && <SpinnerLoader/>}
      </MyContext.Provider>
    </>
  );
}

export default App;
