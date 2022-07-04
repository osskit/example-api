import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { exampleSchema } from './models.js';

export const createExamplePayloadSchema = Type.Omit(exampleSchema, ['id'], { $id: 'CreateExamplePayload' });

export type CreateExamplePayload = Static<typeof createExamplePayloadSchema>;
