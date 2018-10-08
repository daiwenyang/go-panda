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
    createMigrationForm:FormGroup;
    dataAnalysis = [];
    excute = ["true"];
    showAnalysis = false;
    deleteSrcObject = [];
    selectTime = true;
    bucketOption = [];
    migrationName = "";
    ak = "";
    sk = "";
    analysisCluster = "";
    srcBucket = "";
    destBucket = "";
    destBuckets = [];
    backendMap = new Map();
    rule = "";
    excutingTime;
    migrationId: string;
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
                    value:element.name
                });
                this.backendMap.set(element.name,element.backend);
            });
        });
    }
    changeSrcBucket(){
        this.destBuckets = [];
        this.bucketOption.forEach((value,index)=>{
            if(this.backendMap.get(value.label) !== this.backendMap.get(this.srcBucket)){
                this.destBuckets.push({
                    label:value.label,
                    value:value.value
                });
            }
        });
    }
    getMigrations() {
        this.allMigrations = [];
        this.MigrationService.getMigrations().subscribe((res) => {
            this.allMigrations = res.json();
        });
    }

    createMigration() {
        let excutingTime = new Date().getTime();
        if (!this.selectTime) {
            excutingTime = this.excutingTime.getTime();
        }
        let param = {
            "name": this.migrationName,
            "srcBucket": this.srcBucket,
            "destBucket": this.destBucket,
            "excutingTime": excutingTime,
            "rule": this.rule,
            "configDataAnalysis": this.showAnalysis,
            "analysisCluster": this.analysisCluster,
            "ak": this.ak,
            "sk": this.sk,
            "deleteSrcObject": this.deleteSrcObject.length !== 0 
        }
        this.MigrationService.createMigration(param).subscribe((res) => {
            this.createMigrateShow = false;
            this.getMigrations();
        });

    }

    onRowExpand(evt) {
        this.migrationId = evt.data.id;
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
