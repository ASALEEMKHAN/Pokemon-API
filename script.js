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
