import "reflect-metadata";
import { Connection, createConnection, EntityManager, getConnectionManager, QueryRunner, getConnectionOptions, ConnectionOptions } from "typeorm";

/**
 * Database manager class
 */
class DatabaseManager {
  private entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
    if (prevEntities.length !== newEntities.length) return true;

    for (let i = 0; i < prevEntities.length; i++) {
      if (prevEntities[i] !== newEntities[i]) return true;
    }

    return false;
  }
  private async updateConnectionEntities(connection: Connection, entities: any[]) {
    if (!this.entitiesChanged(connection.options.entities, entities)) return;

    // @ts-ignore
    connection.options.entities = entities;

    // @ts-ignore
    connection.buildMetadatas();

    if (connection.options.synchronize) {
      await connection.synchronize();
    }
  }

  private async ensureConnection(name: string = "default"): Promise<Connection> {
    const connectionManager = getConnectionManager();
    const connectionOptions = await getConnectionOptions(name);

    if (connectionManager.has(name)) {
      const connection = connectionManager.get(name);

      if (!connection.isConnected) {
        await connection.connect();
      }

      if (process.env.NODE_ENV !== "production") {
        const entities = connectionOptions.entities;
        await this.updateConnectionEntities(connection, entities);
      }

      return connection;
    }

    return await connectionManager.create({ name, ...connectionOptions }).connect();
  }

  public async runMigrations() {
    const conn = await this.ensureConnection();
    return await conn.runMigrations();
  }

  public async getManager(): Promise<EntityManager> {
    const conn = await this.ensureConnection();
    return conn.manager;
  }

  public async getQuerryRunner(): Promise<QueryRunner> {
    const conn = await this.ensureConnection();
    return conn.createQueryRunner();
  }
}

const databaseManager = new DatabaseManager();
export default databaseManager;
