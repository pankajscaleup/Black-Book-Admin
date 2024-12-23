import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import "./scss/App.scss";
import DataTable from "./components/UI/dataTable/DataTable";
import FormCus from "./components/UI/form/FormCus";

const NotFound = React.lazy(() => import("./pages/NotFound"));
const NotAuthorized = React.lazy(() => import("./pages/NotAuthorized"));
const Login = React.lazy(() => import("./pages/Login"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

const DashboardPage = React.lazy(
  () => import("./pages/admin/Dashboard")
);

const UserUpdate = React.lazy(
  () => import("./pages/admin/UserView")
);

const AddUser = React.lazy(
  () => import("./pages/admin/AddUser")
);

const Users = React.lazy(
  () => import("./pages/admin/Users")
);


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='/design/table' element={<DataTable />} />
              <Route path='/design/form' element={<FormCus />} />

              <Route path='/admin/dashboard' element={<DashboardPage />}/>
              <Route path='/admin/users' element={<Users />} />
              <Route path='/admin/addUser/:id?' element={<AddUser />} />
              <Route path='/admin/users/:id' element={<UserUpdate />}/>
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/not-authorized' element={<NotAuthorized />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
