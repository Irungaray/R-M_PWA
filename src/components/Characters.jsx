import React, { useState, useEffect } from 'react';
import axios from "axios";

const Characters = () => {
    const [characters, setCharacters] = useState([]);

    const getCharacters = async () => {
        try {
            let characterList = await axios({
                url: 'https://anapioficeandfire.com/api/characters?pageSize=30',
                method: 'GET',
            });

            console.log(characterList.data)
        } catch (error) {
            console.log('Error in fetch:', error);
        }
    }

    getCharacters()

    // useEffect(() => {
    //     fetch('https://anapioficeandfire.com/api/characters')
    //         .then(response => response.json())
    //         .then(data => setCharacters(data.results))
    // }, []);

    return (
        <div className="Characters">
            {/* {characters.map(character => (
                <h2>
                    {character.name}
                </h2>
            ))} */}
        </div>
    )
}

export default Characters;