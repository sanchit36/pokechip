import React from "react";
import { IPokemon } from "../../models/pokemon.interface";
import "./pokemon-card.css";

interface PokemonCardProps {
  pokemon: IPokemon;
  onClick: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  return (
    <div className="pokemon-card" onMouseDown={onClick}>
      <div className="pokemon-card__img">
        <img src={pokemon.image.url} alt={pokemon.image.alt} />
      </div>
      <div className="pokemon-card__content">{pokemon.name}</div>
    </div>
  );
};

export default PokemonCard;
