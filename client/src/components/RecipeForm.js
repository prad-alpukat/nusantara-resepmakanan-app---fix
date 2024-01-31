import React, { useState } from 'react';

function RecipeForm({ onAddRecipe }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      id: Math.floor(Math.random() * 1000),
      name,
      description,
    };

    onAddRecipe(newRecipe);

    setName('');
    setDescription('');
  };

  return (
    <div>
      <h2>Tambahkan Resep Baru</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Resep:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Descripsi Resep:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <button type="submit">Tambahkan</button>
      </form>
    </div>
  );
}

export default RecipeForm;
