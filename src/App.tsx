import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from './pages/auth/authPage';
import UserPage from './pages/user/userPage';
import { DI } from './services/di';

export default function App() {
  let navigate = useNavigate();
  useEffect(() => {
    DI.init(navigate); //нужно передать его в DI чтобы из всех сервисов было доступен
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="user" element={<UserPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
