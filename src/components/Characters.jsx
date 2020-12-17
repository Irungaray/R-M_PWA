import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback
} from "react";

import useCharacters from "../hooks/useCharacters";

import Search from "./Search";

import "./styles/Characters.css";

const initialState = {
  favorites: [],
};

const API = "https://rickandmortyapi.com/api/character"

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
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(API)

  const handleFavorite = (favorite) => {
    dispatch({
      type: !!isCharacterInFavorites(favorite)
        ? "REMOVE_FROM_FAVORITE"
        : "ADD_TO_FAVORITE",
      payload: favorite,
    });
  };

  const isCharacterInFavorites = (favorite) =>
    favorites.favorites.find((character) => character.id === favorite.id);

  // Search without useCallback
  // const handleSearch = () => {
  //   setSearch(searchInput.current.value)
  // };

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value)
  }, [])

  // Search without useMemo Hook
  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase())
  // });
  const filteredUsers = useMemo(() =>
    characters.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    }),
    [characters, search]
  );

  var favIcon =
    "https://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/Button-Favorite-icon.png";
  var delIcon =
    "https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/red-x.png";
  console.log("Favorites: ", favorites);

  return (
    <>
      <div className="Favorites">
        <h2>
          {favorites.favorites.length === 0
            ? "Click the Star icon to add your favorites characters here!"
            : "Favorites:"}
        </h2>

        {favorites.favorites.map((favorite) => (
          <li key={favorite.id} className="FavList">
            <button type="button" onClick={() => handleFavorite(favorite)}>
              <img src={delIcon} alt="" className="Icon delete" />
            </button>
            {favorite.name}
          </li>
        ))}
      </div>

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      <div className="Characters">
        {filteredUsers.map((character) => (
          <div className="Character" key={character.id}>
            <h2> {character.name} </h2>

            <img src={character.image} alt="Character" />

            <h4> Type: {character.species} </h4>
            <h4> Gender: {character.gender} </h4>
            <h4> Origin: {character.origin.name} </h4>

            <button type="button" onClick={() => handleFavorite(character)}>
              <img
                className="Icon"
                src={!!isCharacterInFavorites(character) ? delIcon : favIcon}
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
