import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import RootLayout from "./RootLayout";
import AuthLayout from "./pages/Auth";

export const App = () => (
  <Routes>
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
    <Route path="/auth" element={<AuthLayout/>}>
    </Route>
  </Routes>
);
