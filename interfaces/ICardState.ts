import Pokemon from "./IPokemon";
export default interface CardState {
  pokemon: Pokemon;
  flipped: boolean;
  canFlip: boolean;
}
