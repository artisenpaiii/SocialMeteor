import React from 'react';
import { Hello } from './Hello';
import { Routes, Route } from 'react-router';
export const App = () => (
  <Routes>
    <Route path='/' element={<Hello/>}/>
  </Routes>
);
