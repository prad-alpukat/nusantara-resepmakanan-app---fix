import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RecipeDetail({ recipes }) {
  const { id } = useParams();
  // const recipe = recipes.find(r => r.id === parseInt(id, 10));

  const [recipe, setRecipe] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:8800/resep/' + id)
      .then(res => {
        console.log(res.data);
        setRecipe(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  if (!recipe) {
    return <p>Resep tidak ditemukan.</p>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      {/* Tampilkan informasi lainnya sesuai kebutuhan */}
    </div>
  );
}

export default RecipeDetail;
