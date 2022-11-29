import path from "path";

export default ({ env }) => ({
  connection: {
    // client: 'mysql',
    // connection: {
    //   host: env('DATABASE_HOST', '127.0.0.1'),
    //   port: env.int('DATABASE_PORT', 3306),
    //   database: env('DATABASE_NAME', 'api_strapi'),
    //   user: env('DATABASE_USERNAME', 'daniel'),
    //   password: env('DATABASE_PASSWORD', ''),
    //   ssl: env.bool('DATABASE_SSL', false),
    // },
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    }
  },
});
