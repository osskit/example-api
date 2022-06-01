import fetchApi from 'node-fetch';
import type { Pokemon } from '../../../packages/client';
import { Configuration, PokemonApi } from '../../../packages/client';
import { clear as clearMongo, close as closeMongo, init as initMongo, insertPokemons } from '../mongo';

const testPokemon: Pokemon = {
  id: '6740239e-a263-4933-9c8e-b397ba473fa5',
  name: 'name',
};

const pokemonApi = new PokemonApi(
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

  it('create pokemon', async () => {
    await pokemonApi.createPokemon({ payload: testPokemon });

    const pokemon = await pokemonApi.getPokemon(testPokemon.id);

    expect(pokemon).toMatchObject(testPokemon);
  });

  it('get pokemon', async () => {
    await insertPokemons([testPokemon]);
    const pokemon = await pokemonApi.getPokemon(testPokemon.id);

    expect(pokemon).toMatchSnapshot();
  });
});
