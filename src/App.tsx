import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import DataTable from "./components/UI/dataTable/DataTable";
import FormCus from "./components/UI/form/FormCus";
import ChangePass from "./components/form/ChangePass";
import Testimonials from "./pages/admin/Testimonials";
import "./scss/App.scss";

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

const Faqs = React.lazy(
  () => import("./pages/admin/Faqs")
);

const Support = React.lazy(
  () => import("./pages/admin/Support")
);

const AddFaq = React.lazy(
  () => import("./pages/admin/AddFaq")
);

const Pages = React.lazy(
  () => import("./pages/admin/Pages")
);

const AddPage = React.lazy(
  () => import("./pages/admin/AddPage")
);

const Settings = React.lazy(
  () => import("./pages/admin/Settings")
);

const AddTestimonial = React.lazy(
  () => import("./pages/admin/AddTestimonial")
);

const FilterOptions = React.lazy(
  () => import("./pages/admin/FilterOptions")
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
              <Route path='/admin/profile' element={<FormCus />} />
              <Route path='/admin/changePassword' element={<ChangePass/>} />
              <Route path='/admin/support' element={<Support/>} />
              <Route path='/admin/settings' element={<Settings/>} />
              <Route path='/admin/filter-options/:type' element={<FilterOptions/>} />

              <Route path='/admin/dashboard' element={<DashboardPage />}/>
              <Route path='/admin/users' element={<Users />} />
              <Route path='/admin/addUser/:id?' element={<AddUser />} />
              <Route path='/admin/users/:id' element={<UserUpdate />}/>
              <Route path='/admin/faqs' element={<Faqs />}/>
              <Route path='/admin/faq/:type/:id?' element={<AddFaq />} />
              <Route path='/admin/pages' element={<Pages />}/>
              <Route path='/admin/page/edit/:id?' element={<AddPage />} />
              <Route path='/admin/testimonials' element={<Testimonials/>} />
              <Route path='/admin/testimonial/:type/:id?' element={<AddTestimonial />} />
              
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
