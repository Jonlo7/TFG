import mysql, { Connection, ConnectionOptions } from "mysql2/promise";

export async function createMySQLConnection(
  config: ConnectionOptions,
): Promise<Connection> {
  return mysql.createConnection(config);
}
