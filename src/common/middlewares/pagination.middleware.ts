import { BadRequestError, ExpressMiddlewareInterface, Middleware, UnauthorizedError } from 'routing-controllers'
import { NextFunction, Response, Request } from 'express'

@Middleware({ type: 'before' })
export class PaginationMiddleware implements ExpressMiddlewareInterface {

  async use(request: Request, response: Response, next: NextFunction): Promise<void> {
    const body =  this.getPageAndLimit(request.query)
    const order = this.getOrder(request?.query)
    const conditions = this.getRestConditions(request?.query)
    // console.log({conditions});
    
    Object.assign(request, { query: {...body, order, conditions} });
    next()
  }
  getPageAndLimit(body) {
    let page = body?.page, limit = body?.limit
    
    if(page && page == 0) {
      throw new BadRequestError('Page must not be 0');
    }
    if (!body.page) {
      page = 1 
    }
    if (!body.limit) {
     limit = 10
    }
    page = page - 1
    return { page, limit: Number(limit) };
  }

  getOrder(body) {
    let sortAttribute = body?.sortAttribute, sortDirection = body?.sortDirection
    if(!body?.sortAttribute){
      sortAttribute = 'id'
    }
    if(!body?.sortDirection){
      sortDirection = 'DESC'
    }
    let order= {}
    order[`${sortAttribute}`] =sortDirection
    return order
  }

  getRestConditions(query){
    const keys = Object.keys((query))
    
    keys.map((key) => {
      if(key == 'page' || key == 'limit' || key == 'sortDirection' || key == 'sortAttribute') {
        console.log({key});
        
        delete query[key]
      }
    })
    return query
  }
}
