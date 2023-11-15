import { router } from "./router";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen bg-background text-foreground">
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
