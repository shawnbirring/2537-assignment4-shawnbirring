"use client";
import { useEffect, useState } from "react";
import CardState from "../Interfaces/ICardState";
import fetchPokemon from "../Utils/fetchPokemon";
import PokemonGrid from "../Components/PokemonGrid";
import { shuffleArray, checkForMatch } from "../Utils/gameLogic";
import { Typography } from "@mui/material";

export default function Game({ difficulty }: { difficulty: number }) {
  const [cards, setCards] = useState<CardState[]>([]);
  const [pair, setPair] = useState<number[]>([]);
  const [pairs, setPairs] = useState<number>(difficulty);
  const [matches, setMatches] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(difficulty * 2 * 60);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [powerUp, setPowerUp] = useState<boolean>(false);

  const fetchNewGame = async () => {
    const data = await fetchPokemon(difficulty);
    const cardData = shuffleArray([...data, ...data]).map((pokemon) => ({
      pokemon,
      flipped: false,
      canFlip: true,
    }));
    setCards(cardData);
  };

  useEffect(() => {
    fetchNewGame();
  }, [difficulty]);

  const handleFlip = (index: number) => {
    if (
      cards.length === 0 ||
      !cards[index]?.canFlip ||
      pair.length === 2 ||
      powerUp
    )
      return;
    const newCards = [...cards];
    newCards[index].flipped = true;
    newCards[index].canFlip = false;
    setCards(newCards);
    setPair((prev) => [...prev, index]);
    setClicks(clicks + 1);
  };

  useEffect(() => {
    if (pair.length < 2) return;
    const newCards = [...cards];
    if (
      checkForMatch(newCards[pair[0]].pokemon.id, newCards[pair[1]].pokemon.id)
    ) {
      newCards[pair[0]].canFlip = false;
      newCards[pair[1]].canFlip = false;
      setMatches(matches + 1);
      setPairs(pairs - 1);
    } else {
      newCards[pair[0]].flipped = false;
      newCards[pair[1]].flipped = false;
      newCards[pair[0]].canFlip = true;
      newCards[pair[1]].canFlip = true;
    }
    setTimeout(() => {
      setPair([]);
      setCards(newCards);
    }, 1000);
  }, [pair]);

  useEffect(() => {
    if (timeLeft <= 0 || pairs === 0) {
      setGameOver(true);
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, pairs]);

  const activatePowerUp = () => {
    if (powerUp) return;
    setPowerUp(true);
    const newCards = cards.map((card) => ({ ...card, flipped: true }));
    setCards(newCards);
    setTimeout(() => {
      const newCards = cards.map((card) => ({ ...card, flipped: false }));
      setCards(newCards);
      setPowerUp(false);
    }, 3000);
  };

  return (
    <>
      <br></br>
      <button onClick={activatePowerUp}>activate me</button>
      <Typography>Difficulty: {difficulty}</Typography>
      <Typography>Total pairs: {difficulty}</Typography>
      <Typography>Matches: {matches}</Typography>
      <Typography>Pairs left: {pairs}</Typography>
      <Typography>Clicks: {clicks}</Typography>
      <Typography>Time left: {timeLeft}</Typography>
      <br></br>
      {powerUp && (
        <Typography>
          Power Up activated! All cards are flipped for 3 seconds.
        </Typography>
      )}
      <PokemonGrid cards={cards} onFlip={handleFlip} />
      {gameOver && (
        <Typography variant="h5">
          <br></br>You Win!
        </Typography>
      )}
    </>
  );
}
