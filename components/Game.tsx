"use client";
import { useEffect, useState, useRef } from "react";
import { Typography } from "@mui/material";
import CardState from "../interfaces/ICardState";
import Pokemon from "../interfaces/IPokemon";
import fetchPokemon from "../utils/fetchPokemon";
import { shuffleArray, checkForMatch } from "../utils/gameLogic";
import PokemonGrid from "./PokemonGrid";

export default function Game({ difficulty }: { difficulty: number }) {
  const [cards, setCards] = useState<CardState[]>([]);
  const [pair, setPair] = useState<number[]>([]);
  const [pairs, setPairs] = useState<number>(difficulty);
  const [matches, setMatches] = useState<number>(0);
  const [clicks, setClicks] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(difficulty * 10);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [powerUp, setPowerUp] = useState<boolean>(false);
  const powerUpRef = useRef<NodeJS.Timeout | null>(null);
  const cardsRef = useRef(cards);

  const fetchNewGame = async () => {
    const data = await fetchPokemon(difficulty);
    const cardData = shuffleArray([...data, ...data]).map(
      (pokemon: Pokemon) => ({
        pokemon,
        flipped: false,
        canFlip: true,
      })
    );
    setCards(cardData);
  };

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
    fetchNewGame();
  }, [difficulty]);

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

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
    if (powerUpRef.current !== null) {
      clearTimeout(powerUpRef.current);
    }
    const powerUpTime = Math.random() * (30000 - 20000) + 20000;

    powerUpRef.current = setTimeout(() => {
      activatePowerUp();
    }, powerUpTime);
  }, [powerUp]);

  useEffect(() => {
    if (pairs === 0) {
      setGameOver(true);
    } else if (timeLeft <= 0) {
      setGameOver(true);
      clearTimeout(powerUpRef.current!);
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
    const originalState = [...cardsRef.current];
    setCards(cardsRef.current.map((card) => ({ ...card, flipped: true })));
    setTimeout(() => {
      setCards(originalState);
      setPowerUp(false);
    }, 3000);
  };

  return (
    <>
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
          <br></br>
          {pairs === 0 ? "You Win!" : "You Lose!"}
        </Typography>
      )}
    </>
  );
}
