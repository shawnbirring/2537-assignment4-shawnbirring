"use client";
import { useState, useEffect } from "react";
import { Button, Container, Box, Typography, Switch } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Game from "../components/Game";

export default function Home() {
  const [difficulty, setDifficulty] = useState<number>(5);
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
    setDifficulty(5);
  };

  useEffect(() => {
    const bodyElement = document.querySelector("body");
    const textElements = document.querySelectorAll(
      "body, h1, h2, h3, h4, h5, h6, p, span, a"
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
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <Typography variant="h6" gutterBottom>
                  Difficulty
                </Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={difficulty}
                onChange={(_, value) => setDifficulty(parseInt(value))}
              >
                <FormControlLabel value={5} control={<Radio />} label="Easy" />
                <FormControlLabel
                  value={12}
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel value={24} control={<Radio />} label="Hard" />
              </RadioGroup>
            </FormControl>
          </Box>
        )}

        {gameStarted ? (
          <Button color="secondary" variant="contained" onClick={handleReset}>
            Reset Game
          </Button>
        ) : (
          <Button color="secondary" variant="contained" onClick={handleStart}>
            Start Game
          </Button>
        )}
        {gameStarted && difficulty && <Game difficulty={difficulty} />}
      </Box>
    </Container>
  );
}
