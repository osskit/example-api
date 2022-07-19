process.env.NODE_ENV = 'dev';
process.env.MONGO_URI = 'bla';
process.env.MONGO_DB_NAME = 'bla';
process.env.SERVICE_NAME = 'bla'
process.env.SERVICE_VERSION = 'bla'

const { init } = await import('../src/server/index.js');
const fastify = await init();

await fastify.ready();
const swagger = fastify.swagger();

console.log(JSON.stringify(swagger, null, 2));

export {};
