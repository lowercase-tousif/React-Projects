import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainApp from "./MainApp";
import MealDetails from "./MealDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/meal/:idMeal" element={<MealDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
