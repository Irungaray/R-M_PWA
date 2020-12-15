import React, { useState, useEffect } from 'react';

import "./styles/Characters.css"

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
      .catch(error => console.warn("Error in fetch:", error))
  }, []);

  console.log(characters)

  return (
    <div className="Characters">
        {characters.map(character => (
            <div className="Character" key={character.id}>
                <h2> {character.name} </h2>

                <img src={character.image} alt="Character"/>

                <h4> Type: {character.species} </h4>
                <h4> Gender: {character.gender} </h4>
                <h4> Origin: {character.origin.name} </h4>
            </div>
        ))}
    </div>
  );
}

export default Characters;