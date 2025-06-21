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
import { RoutesEnum } from "./constants/routes.ts";

const App: React.FC = () => {
  const location = useLocation();
  const hideHeader = [RoutesEnum.Login, RoutesEnum.Register].includes(location.pathname as RoutesEnum);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path={RoutesEnum.Login} element={<Login />} />
        <Route path={RoutesEnum.Users} element={<UsersScreen />} />
        <Route path={`${RoutesEnum.Users}/:id`} element={<UpdateUser />} />
        <Route path={RoutesEnum.Notes} element={<NoteTables />} />
        <Route path={RoutesEnum.PostUser} element={<PostUser />} />
        <Route path={RoutesEnum.CreateNote} element={<PostNote />} />
        <Route path={RoutesEnum.Categories} element={<CategoriesScreen />} />
      </Routes>
    </>
  );
};
export default App;
