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
      "body, h1, h2, h3, h4, h5, h6, p, span, a, button"
    );

    if (bodyElement && darkMode) {
      bodyElement.style.backgroundColor = "#1f2937";
      textElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.color = "#fff";
      });
    } else if (bodyElement) {
      bodyElement.style.backgroundColor = "#fff";
      textElements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.color = "#000";
      });
    }
  }, [darkMode]);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        py={2}
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
              sx={{
                m: 1,
                backgroundColor: difficulty === 5 ? "black" : "white",
                color: difficulty === 5 ? "grey" : "black",
              }}
              onClick={() => setDifficulty(5)}
            >
              Easy
            </Button>
            <Button
              sx={{
                m: 1,
                backgroundColor: difficulty === 12 ? "black" : "white",
                color: difficulty === 12 ? "grey" : "black",
              }}
              onClick={() => setDifficulty(12)}
            >
              Medium
            </Button>
            <Button
              sx={{
                m: 1,
                backgroundColor: difficulty === 24 ? "black" : "white",
                color: difficulty === 24 ? "grey" : "black",
              }}
              onClick={() => setDifficulty(24)}
            >
              Hard
            </Button>
          </Box>
        )}

        {gameStarted ? (
          <Button
            sx={{ color: "black", backgroundColor: "white" }}
            onClick={handleReset}
          >
            Reset Game
          </Button>
        ) : (
          <Button
            sx={{ color: "black", backgroundColor: "white" }}
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
