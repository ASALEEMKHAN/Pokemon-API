//Type - 1

// const pokemonListElement = document.getElementById('pokemon-list');
// const paginationButton = document.getElementById('pagination-button');
// let currentOffset = 0;

// async function fetchPokemonList(offset) {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`);
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function fetchPokemonDetails(pokemon) {
//   try {
//     const response = await fetch(pokemon.url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function displayPokemonList(offset) {
//   const pokemonList = await fetchPokemonList(offset);

//   pokemonListElement.innerHTML = '';

//   for (const pokemon of pokemonList) {
//     const pokemonDetails = await fetchPokemonDetails(pokemon);

//     const pokemonElement = document.createElement('li');
//     pokemonElement.textContent = pokemonDetails.name;

//     const abilitiesList = document.createElement('ul');
//     for (const ability of pokemonDetails.abilities) {
//       const abilityElement = document.createElement('li');
//       abilityElement.textContent = ability.ability.name;
//       abilitiesList.appendChild(abilityElement);
//     }
//     pokemonElement.appendChild(abilitiesList);

//     const movesList = document.createElement('ul');
//     for (const move of pokemonDetails.moves) {
//       const moveElement = document.createElement('li');
//       moveElement.textContent = move.move.name;
//       movesList.appendChild(moveElement);
//     }
//     pokemonElement.appendChild(movesList);

//     const weightElement = document.createElement('p');
//     weightElement.textContent = `Weight: ${pokemonDetails.weight}`;

//     pokemonElement.appendChild(weightElement);

//     pokemonListElement.appendChild(pokemonElement);
//   }
// }

// paginationButton.addEventListener('click', () => {
//   currentOffset += 50;
//   displayPokemonList(currentOffset);
// });

// displayPokemonList(currentOffset);

// const pokemonListElement = document.getElementById('pokemon-list');
// const paginationButton = document.getElementById('pagination-button');
// let currentOffset = 0;

// async function fetchPokemonList(offset) {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`);
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error(error);
//   }
// }

// async function fetchPokemonDetails(pokemonUrl) {
//   try {
//     const response = await fetch(pokemonUrl);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// function createPokemonElement(pokemon) {
//   const pokemonElement = document.createElement('li');
//   pokemonElement.textContent = pokemon.name;

//   const abilitiesList = document.createElement('ul');
//   for (const ability of pokemon.abilities) {
//     const abilityElement = document.createElement('li');
//     abilityElement.textContent = ability.ability.name;
//     abilitiesList.appendChild(abilityElement);
//   }
//   pokemonElement.appendChild(abilitiesList);

//   const movesList = document.createElement('ul');
//   for (const move of pokemon.moves) {
//     const moveElement = document.createElement('li');
//     moveElement.textContent = move.move.name;
//     movesList.appendChild(moveElement);
//   }
//   pokemonElement.appendChild(movesList);

//   const weightElement = document.createElement('p');
//   weightElement.textContent = `Weight: ${pokemon.weight}`;
//   pokemonElement.appendChild(weightElement);

//   return pokemonElement;
// }

// async function displayPokemonList(offset) {
//   const pokemonList = await fetchPokemonList(offset);

//   pokemonListElement.innerHTML = '';

//   for (const pokemon of pokemonList) {
//     const pokemonDetails = await fetchPokemonDetails(pokemon.url);
//     const pokemonElement = createPokemonElement(pokemonDetails);
//     pokemonListElement.appendChild(pokemonElement);
//   }
// }

// paginationButton.addEventListener('click', () => {
//   currentOffset += 50;
//   displayPokemonList(currentOffset);
// });

// displayPokemonList(currentOffset);


// Type-2

// const pokemonList = document.getElementById('pokemon-list');
// const prevButton = document.getElementById('prev-btn');
// const nextButton = document.getElementById('next-btn');

// let limit = 50;
// let offset = 0;

// async function fetchPokemon() {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
//     const data = await response.json();

//     // Clear the current list of pokemon
//     pokemonList.innerHTML = '';

//     // Loop through the pokemon data and create a list item for each one
//     for (const pokemon of data.results) {
//       const pokemonData = await fetch(pokemon.url).then(response => response.json());
//       const abilities = pokemonData.abilities.map(ability => ability.ability.name);
//       const moves = pokemonData.moves.map(move => move.move.name);
//       const listItem = document.createElement('li');
//       listItem.innerHTML = `
//         <h2>${pokemon.name}</h2>
//         <p>Abilities: ${abilities.join(', ')}</p>
//         <p>Moves: ${moves.join(', ')}</p>
//         <p>Weight: ${pokemonData.weight}</p>
//       `;
//       pokemonList.appendChild(listItem);
//     }

//     // Enable/disable the prev/next buttons based on whether there are more pages
//     if (offset === 0) {
//       prevButton.disabled = true;
//     } else {
//       prevButton.disabled = false;
//     }
//     if (offset + limit >= data.count) {
//       nextButton.disabled = true;
//     } else {
//       nextButton.disabled = false;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Fetch the first page of pokemon
// fetchPokemon();

// // Add click event listeners to the prev/next buttons
// prevButton.addEventListener('click', () => {
//   offset -= limit;
//   fetchPokemon();
// });
// nextButton.addEventListener('click', () => {
//   offset += limit;
//   fetchPokemon();
// });

// Type - 3

const pokemonContainer = document.getElementById('pokemon-container');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

let offset = 0;
const limit = 50;

const fetchPokemon = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    const pokemonList = data.results;
    pokemonContainer.innerHTML = '';
    for (const pokemon of pokemonList) {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
      const moves = pokemonData.moves.map(move => move.move.name).join(', ');
      const weight = pokemonData.weight;
      const pokemonCard = document.createElement('div');
      pokemonCard.innerHTML = `
        <h2>${pokemonData.name}</h2>
        <p>Abilities: ${abilities}</p>
        <p>Moves: ${moves}</p>
        <p>Weight: ${weight}</p>
      `;
      pokemonContainer.appendChild(pokemonCard);
    }
  } catch (error) {
    console.error(error);
  }
};

prevButton.disabled = true;

prevButton.addEventListener('click', () => {
  if (offset - limit >= 0) {
    offset -= limit;
    fetchPokemon();
    nextButton.disabled = false;
  }
  if (offset === 0) {
    prevButton.disabled = true;
  }
});

nextButton.addEventListener('click', () => {
  offset += limit;
  fetchPokemon();
  prevButton.disabled = false;
});

fetchPokemon();
