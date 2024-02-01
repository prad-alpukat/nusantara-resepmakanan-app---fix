import React, { useState } from 'react';
import axios from 'axios';

function RecipeForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setName('');
    setDescription('')

    const options = {
      method: 'POST',
      url: 'http://localhost:8800/resep',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token')
      },
      data: { title: name, description }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
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
