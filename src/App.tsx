import { useEffect, useState } from "react";
import "./App.css";
import { getPokemonList } from "./services/pokemon";
import { IPokemon } from "./models/pokemon.interface";
import PokemonCard from "./components/pokemon-card/pokemon-card";
import InputChip from "./components/input-chip/input-chip";
import PokemonChip from "./components/pokemon-chip/pokemon-chip";

function App() {
  const [allPokemonSpecies, setAllPokemonSpecies] = useState<IPokemon[]>([]);

  useEffect(() => {
    const initPokemonSpecies = async () => {
      const pokemonSpecies = await getPokemonList();
      setAllPokemonSpecies(pokemonSpecies);
    };
    initPokemonSpecies();
  }, []);

  return (
    <div className="App">
      <h1 className="header">
        Search your favorite <span>Pokemon</span>
      </h1>

      <InputChip
        dataSource={allPokemonSpecies}
        keyIdenifier="name"
        placeholder="Try typing bulbasaur"
        renderChip={(item, highlightedKey, onClose, onFocus) => (
          <PokemonChip
            key={item.name}
            pokemon={item}
            highlightedKey={highlightedKey}
            onClose={onClose}
            onFocus={onFocus}
          />
        )}
        renderDropdowmItem={(item, onSelect) => (
          <PokemonCard key={item.name} pokemon={item} onClick={onSelect} />
        )}
      />
    </div>
  );
}

export default App;
