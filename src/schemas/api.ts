import type { TSchema, Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { pokemonTypeRef, uuidRef } from './models.js';

export const metaSchema = Type.Object(
  {
    correlationId: Type.Optional(uuidRef),
  },
  { $id: 'Meta' },
);
export const metaRef = Type.Ref(metaSchema);

export type Meta = Static<typeof metaRef>;

export const requestBaseSchema = <T extends TSchema>(type: T, schemaName: string) =>
  Type.Object(
    {
      payload: type,
      meta: Type.Optional(metaRef),
    },
    { title: schemaName },
  );

export const createPokemonPayloadSchema = Type.Object({
  type: pokemonTypeRef,
  name: Type.String(),
});

export type CreatePokemonPayload = Static<typeof createPokemonPayloadSchema>;
