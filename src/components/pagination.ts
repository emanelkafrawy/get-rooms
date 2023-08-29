export class PaginationService {
    async addPagination({page, limit, order, builder, conditions}) {
      const offset = (page === undefined || limit === undefined) ? undefined : (page * limit);
      builder.limit(limit).offset(offset);
      Object.entries(order).forEach((ent) => {
        builder.addOrderBy(ent[0], ent[1]);
      });
        return builder.getRawMany()
          .catch((e) => {
            throw e;
          });
    }

    //! need to handle -> 'currently not working'
   dynamicWhereQuery(conditions, query){
      const keys = Object.keys(conditions)
      const params:any = {}; 
      keys.map((key, index) => {
        
        params[key] = `%${conditions[key]}%`;
        const whereClause = `${keys} like :${keys}`;
        if(index === 0){
          query.where(whereClause, params)
          return;
        }
        query.andWhere(whereClause, params);
      })   
      console.log(query.getQueryAndParameters());
    }
}