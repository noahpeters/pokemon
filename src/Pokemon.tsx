import { PokemonType } from "./usePokemon";

export default function Pokemon({
  pokemon,
  hideMoves = []
}: {
  pokemon: PokemonType;
  hideMoves?: Array<string>;
}) {
  return (
    <div className="pokemon">
      {pokemon.imageURL != null ? (
        <img src={pokemon.imageURL} alt={pokemon.name} />
      ) : (
        <div style={{ height: 100 }}></div>
      )}
      {pokemon.name}
      <div>
        <ul>
          {pokemon.moves.map((move) =>
            hideMoves.includes(move) ? null : <li key={move}>{move}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
