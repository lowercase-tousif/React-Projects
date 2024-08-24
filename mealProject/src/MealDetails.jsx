import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MealDetailsPage = () => {
  const { idMeal } = useParams();
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMealDetails() {
      try {
        console.log("Meal ID:", idMeal); // Log ID for debugging
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        console.log(res.data); // Log API response
        if (res.data.meals && res.data.meals.length > 0) {
          setMeal(res.data.meals[0]);
        } else {
          setError("No meal data found.");
        }
      } catch (error) {
        setError(error.message);
      }
    }
    fetchMealDetails();
  }, [idMeal]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!meal) return <div className="text-gray-500">Loading...</div>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} (${measure || ""})`);
    }
  }

  return (
    <div className=" mx-auto border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-72 object-cover"
      />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {meal.strMeal}
        </h2>
        <p className="text-lg text-gray-600 mb-1">{meal.strCategory}</p>
        <p className="text-lg text-gray-600 mb-4">{meal.strArea}</p>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Ingredients:
        </h3>
        <ul className="list-disc list-inside mb-4">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Instructions:
        </h3>
        <p className="text-gray-700">{meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default MealDetailsPage;
