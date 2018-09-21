import { Component, OnInit, ViewContainerRef, ViewChild, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { I18NService, Utils } from 'app/shared/api';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AppService } from 'app/app.service';
import { I18nPluralPipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem ,ConfirmationService} from '../../components/common/api';
import { identifierModuleUrl } from '@angular/compiler';

let _ = require("underscore");
@Component({
    selector: 'migration-list',
    templateUrl: 'migration.html',
    providers: [ConfirmationService],
    styleUrls: [],
    animations: []
})
export class MigrationListComponent implements OnInit {
    allMigrations = [];
    selectedMigrations = [];
    createMigrateShow = false;
    constructor(
        public I18N: I18NService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder
    ) {
       

    }

    ngOnInit() {
        this.allMigrations = [{
            name:"migration_for_analytics",
            status:"Migrating",
            source:"bucket_hwc_dr",
            destination:"bucket_s3",
            rule:"files/doc/; files/obj;"
        },{
            name:"migration_for_analytics",
            status:"Completed",
            source:"bucket_hwc_dr",
            destination:"bucket_s3",
            rule:"files/doc/; files/obj;"
        }]
    }
    deleteMigrate(migrate){
        let msg = "<div>Are you sure you want to delete the Migration ?</div><h3>[ "+ migrate.name +" ]</h3>";
        let header ="Delete";
        let acceptLabel = "Delete";
        let warming = true;
        this.confirmDialog([msg,header,acceptLabel,warming,"delete"])
    }
    confirmDialog([msg,header,acceptLabel,warming=true,func]){
        this.confirmationService.confirm({
            message: msg,
            header: header,
            acceptLabel: acceptLabel,
            isWarning: warming,
            accept: ()=>{
                try {
                    
                }
                catch (e) {
                    console.log(e);
                }
                finally {
                    
                }
            },
            reject:()=>{}
        })
    }
}
