import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '1234',
  database: 'postgres',
  entities: ['src/entities/**/*{.ts,.js}'],
  synchronize: false,
  migrations: ['src/migration/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});
