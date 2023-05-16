import PokemonCard from "./PokemonCard";
import CardState from "../Interfaces/ICardState";

type PokemonGridProps = {
  cards: CardState[];
  onFlip: (id: number) => void;
};

const PokemonGrid = ({ cards, onFlip }: PokemonGridProps) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <PokemonCard
          key={index}
          index={index}
          pokemon={card.pokemon}
          flipped={card.flipped}
          onFlip={onFlip}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
