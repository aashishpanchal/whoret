import { Route } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import AppLayout from "@layouts/app.layout";

const AppRouter = (
  <>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </>
);

export default AppRouter;
