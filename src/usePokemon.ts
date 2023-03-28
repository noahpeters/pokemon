export declare interface PokemonType {
  name: string;
  imageURL?: string | null;
  moves: Array<string>;
}

interface ResponseDataType {
  name: string;
  sprites: { [name: string]: string };
  moves: Array<{ move: { name: string } }>;
}

const PokemonDataCache: { [name: string]: PokemonType } = {};
const RequestCache: { [name: string]: Promise<PokemonType> } = {};

export default function usePokemon(name: string) {
  if (PokemonDataCache[name] != null) {
    return PokemonDataCache[name];
  }

  if (RequestCache[name] != null) {
    throw RequestCache[name];
  }

  const request = new Promise<PokemonType>(async (resolve, reject) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data: ResponseDataType = await response.json();

      const pokemon: PokemonType = {
        name: data.name,
        imageURL: data.sprites.front_default,
        moves: data.moves.map(({ move: { name } }) => name)
      };
      PokemonDataCache[name] = pokemon;

      resolve(pokemon);
    } finally {
      delete RequestCache[name];
    }
  });
  RequestCache[name] = request;

  throw request;
}
