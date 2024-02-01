import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// const recipes = [
//   { id: 1, name: 'Bubur Mengguh', image: '/img/gallery/12023CBS_NUSANTARA_KHAS_MAKANAN_Bubur MENGGUH_KHAS_DAERAH_80222_726351TFDFTRT.jpg' },
//   { id: 2, name: 'Kapurung', image: '/img/gallery/12023CBS_NUSANTARA_KHAS_MAKANAN_KAPURUNG_KHAS_DAERAH_90114_726351TFDFTRT.jpg' },
//   { id: 3, name: 'Konro', image: '/img/gallery/12023CBS_NUSANTARA_KHAS_MAKANAN_KONRO_90114_726351TFDFTRT.jpg' },
//   { id: 4, name: 'Tengkleng', image: '/img/gallery/12023CBS_NUSANTARA_KHAS_MAKANAN_TENGKLENG_KHAS_DAERAH_57114_726351TFDFTRT.jpg' },
//   { id: 5, name: 'Rawon', image: '/img/gallery/12023CBS_NUSANTARA_KHAS_MAKANAN_RAWON_KHAS_DAERAH_67115_726351TFDFTRT.jpg' },
//   { id: 6, name: 'Seblak', image: '/img/gallery/12023CBS_NUSANTARA_KHAS_MAKANAN_SEBLAK_40121_726351TFDFTRT.jpg' },
//   { id: 7, name: 'Sop Buntut', image: '/img/gallery/12023CBS_NUSANTARA_KHAS_MAKANAN_Sup Buntut_KHAS_DAERAH_61182_726351TFDFTRT.jpg' },
//   { id: 8, name: 'Tauto', image: '/img/gallery/12023CBS_NUSANTARA_KHAS_MAKANAN_Tauto_KHAS_DAERAH_51112_726351TFDFTRT.jpg' },
//   { id: 9, name: 'Tengkleng', image: '/img/gallery/12023CBS_NUSANTARA_KHAS_MAKANAN_TENGKLENG_KHAS_DAERAH_57114_726351TFDFTRT.jpg' }

// ];


const RecipeList = () => {

  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8800/resep')
      .then(res => {
        console.log(res.data);
        setRecipes(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <div>
      <h2>Daftar Makanan</h2>
      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <div key={recipe.id} className="recipe-item">
            <img src="/img/gallery/12023CBS_NUSANTARA_KHAS_MAKANAN_RAWON_KHAS_DAERAH_67115_726351TFDFTRT.jpg" alt={recipe.name} className="recipe-img" />
            <div className="recipe-info">
              <h3>{recipe.title}</h3>
              <Link to={`/recipe/${recipe.id}`}>Detail Resep</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
