import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryCrudComponent } from './category-crud/category-crud.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from './../../shared/shared.module'
import { InputSwitchModule } from 'primeng/inputswitch';
import { GetCategoryByIdResolve } from './../../shared/resolve/getCategoryById';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Category'
    },
    children: [
      {
        path: '',
        component: CategoryComponent,
        data: {
          title: ''
        },
      },
      {
        path: 'add',
        component: CategoryCrudComponent,
        data: {
          title: 'Create Category'
        },
      },
      {
        path: 'edit/:id',
        component: CategoryCrudComponent,
        data: {
          title: 'Edit Category'
        },
        resolve: {
          category: GetCategoryByIdResolve
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    SharedModule,
    InputSwitchModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [CategoryComponent, CategoryCrudComponent]
})
export class CategoryModule { }
