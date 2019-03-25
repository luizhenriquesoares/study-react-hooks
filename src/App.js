import React, { useState, useEffect } from 'react';

export default function App(){

  const [repositories, setRepositories] = useState([]);

  // component Did Mount
  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/luizhenriquesoares/repos');
    const data = await response.json();
    
    setRepositories(data);
  }, [])

  // componentDidUpdate
  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorites);

    document.title  = `Você tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleLikeFavorites(id) {
    const newRepositories = repositories.map( repo => {
      return repo.id === id ? { ...repo, favorites: !repo.favorites } : repo;
    });
    setRepositories(newRepositories);
  }

  return (
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
        {repo.name} 
        {repo.favorites && <span>(Favorito)</span> }
        <button onClick={() => handleLikeFavorites(repo.id)}>Favorites</button></li>
      ))}
    </ul>
  );
}