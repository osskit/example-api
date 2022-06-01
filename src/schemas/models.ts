import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

export const pokemonTypeSchema = Type.KeyOf(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Type.Object({ Earth: Type.String(), Wind: Type.String(), Fire: Type.String(), Water: Type.String() }),
  {
    $id: 'PokemonType',
  },
);

export const pokemonTypeRef = Type.Ref(pokemonTypeSchema);

export const uuidSchema = Type.String({ format: 'uuid', $id: 'UUID' });
export const uuidRef = Type.Ref(uuidSchema);

export const pokemonSchema = Type.Object(
  {
    id: uuidRef,
    name: Type.String(),
  },
  { $id: 'PokemonSchema' },
);

export const pokemonRef = Type.Ref(pokemonSchema);

export type Pokemon = Static<typeof pokemonRef>;
export type UUID = Static<typeof uuidRef>;
export type PokemonType = Static<typeof pokemonTypeRef>;
