import React, { useEffect, useRef } from "react";
import { IPokemon } from "../../models/pokemon.interface";

import "./pokemon-chip.css";

interface PokemonChipProps {
  pokemon: IPokemon;
  highlightedKey: string;
  onClose: () => void;
  onFocus: () => void;
}

const PokemonChip: React.FC<PokemonChipProps> = ({
  onClose,
  onFocus,
  highlightedKey,
  pokemon,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightedKey === pokemon.name) {
      ref.current?.focus();
    }
  }, [highlightedKey, pokemon.name]);

  return (
    <div
      className="pokemon-chip"
      ref={ref}
      tabIndex={pokemon.id}
      onFocus={onFocus}
    >
      <div className="pokemon-chip__content">
        <div className="pokemon-chip__img">
          <img src={pokemon.image.url} alt={pokemon.image.alt} />
        </div>
        <span>{pokemon.name}</span>
      </div>

      <button className="close" onClick={onClose}>
        x
      </button>
    </div>
  );
};

export default PokemonChip;
