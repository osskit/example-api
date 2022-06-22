import fetchApi from 'node-fetch';
import { Configuration, ExamplesApi } from '../../../packages/client/index.js';
import { clear as clearMongo, close as closeMongo, init as initMongo, insertExamples } from '../mongo.js';

const testExample = {
  id: '6740239e-a263-4933-9c8e-b397ba473fa5',
  name: 'name',
  type: 'a',
};

const exampleApi = new ExamplesApi(
  new Configuration({
    basePath: 'http://localhost:3000/v1',
    fetchApi: fetchApi as any,
    headers: {
      'x-api-client': 'test',
      'x-api-client-version': '1',
    },
  }),
);

describe('main', () => {
  beforeAll(async () => {
    await initMongo();
  });

  beforeEach(async () => {
    await clearMongo();
  });

  afterAll(async () => {
    await closeMongo();
  });

  it('get example', async () => {
    await insertExamples([testExample]);
    const example = await exampleApi.getExample(testExample.id);

    expect(example).toMatchSnapshot();
  });

  it('create example', async () => {
    const example = await exampleApi.createExample({ type: testExample.type, name: testExample.name });

    expect(example).toMatchSnapshot({ id: expect.any(String) });
  });
});
