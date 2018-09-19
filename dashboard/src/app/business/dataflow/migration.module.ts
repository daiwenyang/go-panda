import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MigrationListComponent } from './migration.component';
import { ButtonModule, DataTableModule, DropMenuModule, DialogModule, FormModule, InputTextModule, InputTextareaModule, DropdownModule ,ConfirmationService,ConfirmDialogModule} from '../../components/common/api';

import { HttpService } from './../../shared/service/Http.service';
import { RouterModule } from '@angular/router';
import { MigrationDetailModule } from './migration-detail/migration-detail.module';

@NgModule({
  declarations: [ MigrationListComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DataTableModule,
    DropdownModule,
    DropMenuModule,
    DialogModule,
    FormModule,
    ConfirmDialogModule,
    RouterModule,
    MigrationDetailModule
  ],
  exports: [ MigrationListComponent ],
  providers: [
    HttpService,
    ConfirmationService
  ]
})
export class MigrationModule { }
