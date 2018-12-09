import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,ActivatedRoute } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Injectable()
export class GetUserByIdResolve implements Resolve<any> {

    constructor(private service: CrudService,private router:ActivatedRoute) { }

    resolve(route: ActivatedRouteSnapshot) {

        
        const userId = route.params.id;
        return this.service.getParam('admin/users/details/', { id: userId });
    }
}
