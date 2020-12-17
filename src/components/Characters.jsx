import React, {
  useState,
  useEffect,
  useReducer,
  useMemo
} from "react";

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
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results))
      .catch((error) => console.warn("Error in fetch:", error));
  }, []);

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

  const handleSearch = (event) => {
    setSearch(event.target.value)
  };

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

      <div className="Search">
        <h2>And here you can search for a specific character!</h2>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Just type and see the magic..."
        />
      </div>

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