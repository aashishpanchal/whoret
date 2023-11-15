import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppRouter from "./app.router";
import AdminRouter from "./admin.router";

export const router = createBrowserRouter(
  createRoutesFromElements([AppRouter, AdminRouter])
);
