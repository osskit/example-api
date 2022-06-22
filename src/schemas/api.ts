import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { exampleRef } from './models.js';

export const createExamplePayloadSchema = Type.Omit(exampleRef, ['id'], { $id: 'CreateExamplePayload' });

export type CreateExamplePayload = Static<typeof createExamplePayloadSchema>;
