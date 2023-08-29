
import 'reflect-metadata'
import * as http from 'http'
import Config from 'config'
import AuthApp from './app'
class RoomServer {
  server: any
  readonly host: string
  readonly port: number

  private onListening (): void {
    const addr: any = this.server.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log('Listening on ' + addr.address + ' -- ' + bind)
  }

  private onError (error: any) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }

  constructor () {
    this.host = Config.get('host')
    this.port = Config.get('port')
    const app = new AuthApp()
      this.server = http.createServer(app.init())
      this.server.listen(this.port, this.host)
      this.server.on('error', (e) => {
        console.log('Error', e)
      })
      this.server.on('listening', () => {
        console.log(`server is working on ${this.host} -- ${this.port}`)
      })
  }
}

const roomServer = new RoomServer()
