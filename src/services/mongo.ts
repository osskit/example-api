import { createMonitor } from '@osskit/monitor';
import { v4 as uuid } from 'uuid';
import { getCollection } from '../framework/mongo.js';
import type { Example, UUID } from '../schemas/models.js';
import type { CreateExamplePayload } from '../schemas/api';

const monitor = createMonitor({ scope: 'mongo' });

const getExamplesCollection = () => getCollection<Example>('examples');

export const getExample = (id: UUID): Promise<Example | null> =>
  monitor('getExample', () => getExamplesCollection().findOne({ id }), { context: { id } });

export const createExample = ({ type, name }: CreateExamplePayload): Promise<Example> => {
  const example = { id: uuid(), name, type };

  return monitor(
    'createExample',
    async () => {
      const result = await getExamplesCollection().insertOne(example);

      if (!result.acknowledged) {
        throw new Error('example could not created');
      }

      return example;
    },
    {
      context: {
        example,
      },
    },
  );
};
