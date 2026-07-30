import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Blogs } from "./pages/Blogs";
import { BlogDetail } from "./pages/BlogDetail";
import { PostagemDetail } from "./pages/PostagemDetail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { NewBlog } from "./pages/NewBlog";
import { NewPostagem } from "./pages/NewPostagem";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route
              path="blogs/novo"
              element={
                <ProtectedRoute>
                  <NewBlog />
                </ProtectedRoute>
              }
            />
            <Route path="blogs/:id" element={<BlogDetail />} />
            <Route
              path="postagens/nova"
              element={
                <ProtectedRoute>
                  <NewPostagem />
                </ProtectedRoute>
              }
            />
            <Route path="postagens/:id" element={<PostagemDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
