import path from 'path';
import fs from 'fs';

const dataDir = path.resolve(__dirname, '../.pgdata');

export async function startDatabase(port = 5432): Promise<any> {
  console.log(`Starting Embedded PostgreSQL on port ${port} with data dir: ${dataDir}...`);

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Dynamic import of ESM package from CommonJS/Node
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const importFn = new Function('specifier', 'return import(specifier)');
  const epModule: any = await importFn('embedded-postgres');
  const EmbeddedPostgres = epModule.default || epModule;

  const pg = new EmbeddedPostgres({
    databaseDir: dataDir,
    port,
    user: 'postgres',
    password: 'password',
    persistent: true,
  });

  try {
    await pg.initialise();
    console.log('PostgreSQL cluster initialized.');
  } catch (err: any) {
    console.log('Initialise note:', err?.message || err);
  }

  try {
    await pg.start();
    console.log(`PostgreSQL server is running on port ${port}!`);
  } catch (err: any) {
    console.log('Start note:', err?.message || err);
  }

  try {
    await pg.createDatabase('campus_care');
    console.log('Database campus_care created or already exists.');
  } catch (err: any) {
    console.log('Create db note:', err?.message || err);
  }

  return pg;
}

if (require.main === module) {
  startDatabase().then(() => {
    console.log('Database runner active. Keep this process running or press Ctrl+C to exit.');
  }).catch(err => {
    console.error('Failed to start PostgreSQL:', err);
    process.exit(1);
  });
}
