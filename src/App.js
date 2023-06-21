import './App.css';
import { ApplicationViews } from "./components/views/ApplicationViews";
import { Authorized } from './components/views/Authorized';
import { Login } from './components/auth/Login';
import { NavBar } from './components/nav/NavBar';
import { Register } from './components/auth/Register';
import { Route, Routes } from 'react-router-dom';

export const TzadikRevision = () => {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="*" element={
      <Authorized>
        <>
          <NavBar />
          <ApplicationViews />
        </>
      </Authorized>
    } />
  </Routes>
}