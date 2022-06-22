import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

export const exampleTypeSchema = Type.Union([Type.Literal('a'), Type.Literal('b')], {
  $id: 'ExampleType',
});

export const exampleTypeRef = Type.Ref(exampleTypeSchema);

export const uuidSchema = Type.String({ format: 'uuid', $id: 'UUID' });
export const uuidRef = Type.Ref(uuidSchema);

export const exampleSchema = Type.Object(
  {
    id: uuidRef,
    name: Type.String(),
    type: exampleTypeRef,
  },
  { $id: 'Example' },
);

export const exampleRef = Type.Ref(exampleSchema);

export type Example = Static<typeof exampleRef>;
export type UUID = Static<typeof uuidRef>;
export type ExampleType = Static<typeof exampleTypeRef>;
