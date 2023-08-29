import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import express from 'express'
import { defaultApplicationMiddleware } from './common/middlewares/default-application.middlware'
import { RoomStatusController } from './components/room-status/controller'
import { CitiesController } from './components/city/controller'
import { CountriesController } from './components/country/controller'
import { RoomsController } from './components/rooms/controller'

export default class AppServer {

    public init (){
        //need to add here cache instead of calling apis to fill db
        const expressApp = express()
        expressApp.enable('trust proxy')
        expressApp.use(express.urlencoded({ extended: false }))       
        useExpressServer(expressApp, {
            // routePrefix: 'get-rooms',
            defaultErrorHandler: false,
            controllers: [RoomStatusController, CitiesController, CountriesController, RoomsController],
            middlewares: defaultApplicationMiddleware(),
            validation: true
          })
          return expressApp
    }
}