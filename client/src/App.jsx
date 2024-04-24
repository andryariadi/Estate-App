import HomePage from "./routes/HomePage/HomePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/layout";
import ListPage from "./routes/ListPage/ListPage";
import DetailPage from "./routes/SinglePage/DetailPage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import ProfileUpdate from "./routes/ProfileUpdatePage/ProfileUpdate";
import NewPostPage from "./routes/NewPostPage/NewPostPage";
import { listPageLoader, singlePageLoader } from "./libs/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <DetailPage />,
          loader: singlePageLoader,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdate />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
