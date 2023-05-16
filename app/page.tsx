"use client";
import { useState, useEffect } from "react";
import Game from "../Components/Game";
import { Button, Container, Box, Typography, Switch } from "@mui/material";

export default function Home() {
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleStart = () => {
    setGameStarted(true);
  };

  const handleReset = () => {
    setGameStarted(false);
    setDifficulty(null);
  };

  useEffect(() => {
    const bodyElement = document.querySelector("body");
    const textElements = document.querySelectorAll(
      "body, h1, h2, h3, h4, h5, h6, p, span, a"
    );

    if (darkMode) {
      bodyElement.style.backgroundColor = "#1f2937";
      textElements.forEach((element) => {
        element.style.color = "#fff";
      });
    } else {
      bodyElement.style.backgroundColor = "#fff";
      textElements.forEach((element) => {
        element.style.color = "#000";
      });
    }
  }, [darkMode]);

  return (
    <Container>
      <Box
        className="flex flex-col items-center justify-center min-h-screen py-2"
        sx={{ mt: 8 }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Pokemon Memory Game
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: 1 }}>Dark Mode</Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        {!gameStarted && (
          <Box sx={{ my: 2 }}>
            <Button
              className={`m-4 ${
                difficulty === 5
                  ? "bg-black text-white hover:bg-black hover:text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setDifficulty(5)}
            >
              Easy
            </Button>
            <Button
              className={`m-4 ${
                difficulty === 10
                  ? "bg-black text-white hover:bg-black hover:text-white "
                  : "bg-white text-black"
              }`}
              onClick={() => setDifficulty(10)}
            >
              Medium
            </Button>
            <Button
              className={`m-4 ${
                difficulty === 15
                  ? "bg-black text-white hover:bg-black hover:text-white "
                  : "bg-white text-black"
              }`}
              onClick={() => setDifficulty(15)}
            >
              Hard
            </Button>
          </Box>
        )}

        {gameStarted ? (
          <Button
            className="text-black bg-white hover:bg-black hover:text-white"
            onClick={handleReset}
          >
            Reset Game
          </Button>
        ) : (
          <Button
            className="text-black bg-white hover:bg-black hover:text-white"
            onClick={handleStart}
          >
            Start Game
          </Button>
        )}
        {gameStarted && difficulty && <Game difficulty={difficulty} />}
      </Box>
    </Container>
  );
}
