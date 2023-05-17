"use client";
import { Card, CardActionArea } from "@mui/material";
import Image from "next/image";
import Pokemon from "../interfaces/IPokemon";
import "../styles/card.css";

type PokemonCardProps = {
  pokemon: Pokemon;
  flipped: boolean;
  onFlip: (id: number) => void;
  index: number;
};

const PokemonCard = ({ pokemon, flipped, onFlip, index }: PokemonCardProps) => {
  return (
    <CardActionArea onClick={() => onFlip(index)}>
      <Card className={`card ${flipped ? "flipped" : ""}`}>
        {flipped ? (
          <Image src={pokemon.image} alt="pokemon" width={100} height={100} />
        ) : (
          <Image
            src="/card-back.jpg"
            alt="card back"
            width={100}
            height={100}
          />
        )}
      </Card>
    </CardActionArea>
  );
};

export default PokemonCard;
