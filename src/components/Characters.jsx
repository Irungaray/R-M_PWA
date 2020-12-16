import React, { useState, useEffect, useReducer } from "react";

import "./styles/Characters.css";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "REMOVE_FROM_FAVORITE":
      return {
        ...state,
        favorites: [
          ...state.favorites.filter((favorite) => favorite !== action.payload),
        ],
      };

    default:
      return state;
  }
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .catch((error) => console.warn("Error in fetch:", error));
  }, []);

  const handleFavorite = (favorite) => {
    dispatch({
      type: !!isCharacterInFavorites(favorite) ? "REMOVE_FROM_FAVORITE" : "ADD_TO_FAVORITE",
      payload: favorite,
    });
  };

  const isCharacterInFavorites = (favorite) =>
    favorites.favorites.find((character) => character.id === favorite.id);

  console.log("Favorites: ", favorites);

  return (
    <>
      <div className="Favorites">
        <h2>Favorites:</h2>
          {favorites.favorites.map((favorite) => (
            <li
              key={favorite.id}
              className="FavList"
            >
              <button type="button" onClick={() => handleFavorite(favorite)}>
                <img
                    src="https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/red-x.png"
                    alt=""
                    className="Icon delete"
                  />
              </button>
              {favorite.name}
            </li>
          ))}
      </div>

      <div className="Characters">
        {characters.map((character) => (
          <div className="Character" key={character.id}>
            <h2> {character.name} </h2>

            <img src={character.image} alt="Character" />

            <h4> Type: {character.species} </h4>
            <h4> Gender: {character.gender} </h4>
            <h4> Origin: {character.origin.name} </h4>

            <button type="button" onClick={() => handleFavorite(character)}>
              <img
                className="Icon"
                src="https://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/Button-Favorite-icon.png"
                alt=""
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Characters;
