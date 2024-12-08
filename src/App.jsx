import "./App.css";
import Register from "./pages/auth/resgister/Register";
import Login from "./pages/auth/login/Login";
import Wrapper from "./pages/layout/wrapper/Wrapper";
import AllBlogs from "./pages/blogs/allBlogs/AllBlogs";
import BlogDetails from "./pages/blogs/blogDetails/BlogDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogCategory from "./pages/blogs/blogCategory/BlogCategory";
function App() {
  const public_router = [
    {
      path: "/",
      component: <Login />,
    },
    {
      path: "/signup",
      component: <Register />,
    },
  ];
  const private_router = [
    {
      path: "/blogs",
      component: <AllBlogs />,
    },
    {
      path: "/details/:id",
      component: <BlogDetails />,
    },
    {
      path:"/category",
      component:<BlogCategory/>
    }

  ];

  return (
    <>
      <Router>
        <Wrapper>
          <Routes>
            {public_router.map((item, index) => {
              return (
                <Route key={index} path={item.path} element={item.component} />
              );
            })}
            {private_router.map((item, index) => {
              return (
                <Route key={index} path={item.path} element={item.component} />
              );
            })}
          </Routes>
        </Wrapper>
      </Router>
    </>
  );
}

export default App;
