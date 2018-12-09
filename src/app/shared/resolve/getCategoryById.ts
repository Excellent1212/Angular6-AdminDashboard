import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Injectable()
export class GetCategoryByIdResolve implements Resolve<any> {

    constructor(private service: CrudService) { }
    resolve(route: ActivatedRouteSnapshot) {    
        const categoryId = route.params.id;
        return this.service.getParam('admin/category', { _id: categoryId });
    }
}
