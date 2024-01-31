import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail({ recipes }) {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === parseInt(id, 10));

  if (!recipe) {
    return <p>Resep tidak ditemukan.</p>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      {/* Tampilkan informasi lainnya sesuai kebutuhan */}
    </div>
  );
}

export default RecipeDetail;
