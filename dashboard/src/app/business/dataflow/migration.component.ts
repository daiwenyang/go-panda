import { Component, OnInit, ViewContainerRef, ViewChild, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { I18NService, Utils } from 'app/shared/api';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AppService } from 'app/app.service';
import { I18nPluralPipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem ,ConfirmationService} from '../../components/common/api';
import { identifierModuleUrl } from '@angular/compiler';
import { MigrationService } from './migration.service';
import { BucketService } from './../block/buckets.service';

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
    dataAnalysis = [];
    excute = [];
    showAnalysis = false;
    selectTime = false;
    bucketOption = [];
    constructor(
        public I18N: I18NService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder,
        private MigrationService: MigrationService,
        private BucketService:BucketService
    ) {
       

    }

    ngOnInit() {
        this.allMigrations = [{
            name:"migration_for_analytics",
            status:"Migrating",
            srcBucket:"bucket_hwc_dr",
            destBucket:"bucket_s3",
            rule:"files/doc/; files/obj;"
        },{
            name:"migration_for_analytics",
            status:"Completed",
            srcBucket:"bucket_hwc_dr",
            destBucket:"bucket_s3",
            rule:"files/doc/; files/obj;"
        }]
        this.getMigrations();
        this.getBuckets();
    }
    getBuckets() {
        this.bucketOption = [];
        this.BucketService.getBuckets().subscribe((res) => {
            let allbuckets = res.json();
            allbuckets.forEach(element => {
                this.bucketOption.push({
                    label:element.name,
                    value:element.id
                })
            });
        });
    }

    getMigrations() {
        this.allMigrations = [];
        this.MigrationService.getMigrations().subscribe((res) => {
            this.allMigrations = res.json();
        });
    }

    deleteMigrate(migrate){
        let msg = "<div>Are you sure you want to delete the Migration ?</div><h3>[ "+ migrate.name +" ]</h3>";
        let header ="Delete";
        let acceptLabel = "Delete";
        let warming = true;
        this.confirmDialog([msg,header,acceptLabel,warming,"delete"], migrate)
    }
    showDetail(){
        if(this.dataAnalysis.length !== 0){
         this.showAnalysis = true;
        }else{
         this.showAnalysis = false;
        }
    }
    showcalendar(){
        if(this.excute.length !== 0){
         this.selectTime = true;
        }else{
         this.selectTime = false;
        }
    }

    confirmDialog([msg,header,acceptLabel,warming=true,func], migrate){
        this.confirmationService.confirm({
            message: msg,
            header: header,
            acceptLabel: acceptLabel,
            isWarning: warming,
            accept: ()=>{
                try {
                    let id = migrate.id;
                    this.MigrationService.deleteMigration(id).subscribe((res) => {
                        this.ngOnInit();
                    });
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
