import { Route } from "react-router-dom";
import AdminLayout from "@layouts/admin.layout";
import Dashboard from "@/pages/admin/dashboard";

const AdminRouter = (
  <Route path="/" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
  </Route>
);

export default AdminRouter;
