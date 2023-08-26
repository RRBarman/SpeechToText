import Content from "./components/Content";
import "./App.css";
import Layout from "./components/Layout";
import AllUserTask from "./components/AllUserTask";
import SingleUserTask from "./components/SingleUserTask";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./components/ContextProvider";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Content />,
      },
      {
        path: "/userTasks",
        element: <AllUserTask />,
      },
      {
        path: "/userTasks/:id",
        element: <SingleUserTask />,
      },
    ],
  },
]);

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
