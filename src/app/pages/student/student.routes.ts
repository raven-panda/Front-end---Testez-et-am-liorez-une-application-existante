import { Routes } from "@angular/router";
import { StudentBrowseComponent } from "./browse/browse.component";
import { StudentCreateFormComponent } from "./create-form/create-form.component";
import { StudentEditFormComponent } from "./edit-form/edit-form.component";
import { StudentDetailsComponent } from "./details/details.component";

export const routes: Routes = [
  {
    path: '',
    component: StudentBrowseComponent
  },
  {
    path: 'create',
    component: StudentCreateFormComponent
  },
  {
    path: ':id',
    component: StudentDetailsComponent,
  },
  {
    path: ':id/edit',
    component: StudentEditFormComponent
  }
]