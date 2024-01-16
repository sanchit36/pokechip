import { IPokemon } from "../models/pokemon.interface";

interface IPokemonListResponse {
  count: number;
  next: boolean;
  prev: boolean;
  results: Array<{ name: string }>;
}

export const getPokemonList = async (): Promise<IPokemon[]> => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`;
  const res = await fetch(url);
  if (res.ok) {
    const data: IPokemonListResponse = await res.json();
    const pokemons: IPokemon[] = data?.results?.map((res, index) => ({
      id: index + 1,
      name: res.name,
      image: {
        alt: res.name,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
          index + 1
        }.png`,
      },
    }));
    return pokemons;
  } else {
    return [];
  }
};
