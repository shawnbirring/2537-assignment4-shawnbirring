function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function checkForMatch(id1: number, id2: number): boolean {
  return id1 === id2;
}

export { shuffleArray, checkForMatch };
