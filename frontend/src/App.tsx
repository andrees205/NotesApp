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
import Login from "./pages/login.tsx";
import NoteTables from "./components/note/noteTables.tsx";
import CategoriesScreen from "./pages/categories.tsx";
import PostCategory from "./components/category/PostCategory.tsx";
import UpdateNote from "./components/note/UpdateNote.tsx";
import { RoutesEnum } from "./constants/routes.ts";

const App: React.FC = () => {
  const location = useLocation();
  const hideHeader = [RoutesEnum.Login, RoutesEnum.Register].includes(location.pathname as RoutesEnum);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path={RoutesEnum.Login} element={<Login />} />
        
        {/* General screens */}
        <Route path={RoutesEnum.Users} element={<UsersScreen />} />
        <Route path={RoutesEnum.CategoriesScreen} element={<CategoriesScreen />} />
        <Route path={RoutesEnum.noteTables} element={<NoteTables />} />
        
        {/* Update Screens */}
        <Route path={`${RoutesEnum.Users}/:id`} element={<UpdateUser />} />
        <Route path={`${RoutesEnum.UpdateNote}/:id`} element={<UpdateNote />} />
        
        {/* Post Routes */}
        <Route path={RoutesEnum.PostUser} element={<PostUser />} />
        <Route path={RoutesEnum.PostNote} element={<PostNote />} />
        <Route path={RoutesEnum.PostCategory} element={<PostCategory />} />
      </Routes>
    </>
  );
};
export default App;
