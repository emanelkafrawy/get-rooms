import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { NextFunction, Response, Request } from 'express'
import mySql from 'mysql'
import { Service } from 'typedi'
import Config from 'config'
import * as path from 'path';
import {
  Connection,
  createConnection,
  getConnectionManager,
} from 'typeorm';
type DatabaseConnection={host:string, port:number, username:string, password:string, database:string, type:string, synchronize: boolean}
@Middleware({ type: 'before', priority: 100 })
@Service()
export class DatabaseConnectionMiddleware implements ExpressMiddlewareInterface {
  async use (request: Request, response: Response, next: NextFunction): Promise<void> {

    const databaseConfig:DatabaseConnection = Config.get('db_config')
    const { host, port, username, password, database, type, synchronize } = databaseConfig
    await this.connect(
      type,
      host,
      port,
      username,
      password,
      database,
      false
      )
      .catch((error) => {
        // console.log(error);
        
        throw new Error('DB Not Connected')
      })
    next()
  }

  private async connect (
  type: string,
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  synchronize: boolean,
  connectionLimit: number = 10,
  connectTimeout: number = 10000,
  acquireTimeout: number = 10000,
  timeout: number = 10000
  ): Promise<Connection>{
      const connectionManager = getConnectionManager();

  if (
    connectionManager.has('default') &&
    connectionManager.get('default').isConnected
  ) {
    return connectionManager.get('default');
  }
  const connectionOptions: any = {
    acquireTimeout: acquireTimeout,
    connectionLimit: connectionLimit,
    connectTimeout: connectTimeout,
    timeout: timeout
  };
  const extra: any = {
    connectionLimit,
    connectTimeout,
    acquireTimeout
  };
  Object.assign(connectionOptions, { name: 'default' });
  Object.assign(connectionOptions, { type });
  Object.assign(connectionOptions, { host });
  Object.assign(connectionOptions, { port });
  Object.assign(connectionOptions, { username });
  Object.assign(connectionOptions, { password });
  Object.assign(connectionOptions, { database });
  Object.assign(connectionOptions, { synchronize });
  Object.assign(connectionOptions, {
    entities: [path.join(path.dirname(__filename), '../../entity', '*.ts')]
  });
  
  Object.assign(connectionOptions, { extra: extra });

  const connection = await createConnection(connectionOptions);
  return connection;
  }
}
