import usePokemon, { PokemonType } from "./usePokemon";
import Pokemon from "./Pokemon";

import { useMemo } from "react";

export default function Compare() {
  const pikachu = usePokemon("pikachu");
  const voltorb = usePokemon("voltorb");
  const commonMoves: Array<string> = useMemo(() => {
    const found = new Set<string>();
    pikachu.moves.forEach((move) => {
      if (voltorb.moves.includes(move)) {
        found.add(move);
      }
    });
    voltorb.moves.forEach((move) => {
      if (pikachu.moves.includes(move)) {
        found.add(move);
      }
    });
    return Array.from(found);
  }, [pikachu, voltorb]);

  const common = useMemo<PokemonType>(
    () => ({ name: "common", moves: commonMoves }),
    [commonMoves]
  );

  return (
    <div className="panels">
      <Pokemon pokemon={pikachu} hideMoves={commonMoves} />
      <Pokemon pokemon={voltorb} hideMoves={commonMoves} />
      <Pokemon pokemon={common} />
    </div>
  );
}
