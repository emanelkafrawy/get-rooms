import { DatabaseConnectionMiddleware } from './database-connection.middleware'

export const defaultApplicationMiddleware = () => {
  return [
    DatabaseConnectionMiddleware
  ]
}
