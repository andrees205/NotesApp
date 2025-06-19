// File: src/App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/common/header/Header.tsx";
import UsersScreen from "./pages/usersScreen.tsx";
import PostUser from "./components/user/PostUser.tsx";
import PostNote from "./components/note/postNote.tsx";
import UpdateUser from "./components/user/UpdateUser.tsx";
// import NoMatch from "./pages/NoMatch";
import Login from "./pages/login.tsx";
import NoteTables from "./components/note/noteTables.tsx";
import CategoriesScreen from "./pages/categories.tsx";
import PostCategory from "./components/category/PostCategory.tsx";
import UpdateNote from "./components/note/UpdateNote.tsx";

const App: React.FC = () => {
  const location = useLocation();
  const hideHeader = ["/login", "/register"].includes(location.pathname);
  return (
    <>
       {!hideHeader && <Header />}
      <Routes>  
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UsersScreen />} />
        <Route path="/user/:id" element={<UpdateUser />} />
        <Route path="/notes" element={<NoteTables />} />
        <Route path="/postuser" element={<PostUser />} />
        <Route path="/note/create" element={<PostNote />} />
        <Route path="/note/update/:id" element={<UpdateNote />} />
        <Route path="/categories" element={<CategoriesScreen />} />
        <Route path="/categories/create" element={<PostCategory />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </>
  );
};

export default App;
