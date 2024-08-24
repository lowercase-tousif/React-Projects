import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [meals, setMeals] = useState(null);

  useEffect(() => {
    async function getCategory() {
      try {
        const res = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        setData(res.data);
      } catch (error) {
        setError(error.message);
      }
    }
    getCategory();
  }, []);

  // Fetch Food By Category
  useEffect(() => {
    if (selectedCategory) {
      async function getMealsByCategory() {
        try {
          const res = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
          );
          setMeals(res.data.meals);
        } catch (error) {
          setError(error.message);
        }
      }
      getMealsByCategory();
    }
  }, [selectedCategory]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      {error && <p className="text-red-500">Error: {error}</p>}

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="" disabled>
          Select a category
        </option>
        {data?.categories?.map((d) => (
          <option key={d.idCategory} value={d.strCategory}>
            {d.strCategory}
          </option>
        ))}
      </select>

      <h2 className="text-xl font-semibold mb-4">Meals</h2>
      {meals && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{meal.strMeal}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
