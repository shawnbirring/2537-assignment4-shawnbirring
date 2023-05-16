import Pokemon from "@/interfaces/IPokemon";

const getPokemon = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  const pokemon: Pokemon = {
    id: data.id,
    image: data.sprites.front_default,
  };
  return pokemon;
};

async function fetchRandomPokemon(amount: number): Promise<Pokemon[]> {
  const fetchedPokemon: Pokemon[] = [];
  const pokemonIds: Set<number> = new Set();
  while (pokemonIds.size < amount) {
    const randomId = Math.floor(Math.random() * 810) + 1;
    if (!pokemonIds.has(randomId)) {
      pokemonIds.add(randomId);
      const pokemon = await getPokemon(randomId);
      fetchedPokemon.push(pokemon);
    }
  }
  return fetchedPokemon;
}

export default fetchRandomPokemon;
