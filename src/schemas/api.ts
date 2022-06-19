import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { pokemonTypeRef } from './models.js';

export const createPokemonPayloadSchema = Type.Object({
  type: pokemonTypeRef,
  name: Type.String(),
});

export type CreatePokemonPayload = Static<typeof createPokemonPayloadSchema>;
