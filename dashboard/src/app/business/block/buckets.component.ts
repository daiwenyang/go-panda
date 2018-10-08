import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { I18NService } from 'app/shared/api';
import { AppService } from 'app/app.service';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { I18nPluralPipe } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MenuItem ,ConfirmationService} from '../../components/common/api';
import { BucketService} from './buckets.service';
import { debug } from 'util';
import { MigrationService } from './../dataflow/migration.service';

@Component({
    selector: 'bucket-list',
    templateUrl: './buckets.html',
    styleUrls: [],
    providers: [ConfirmationService],
    animations: [
        trigger('overlayState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ]),

        trigger('notificationTopbar', [
            state('hidden', style({
            height: '0',
            opacity: 0
            })),
            state('visible', style({
            height: '*',
            opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ]
})
export class BucketsComponent implements OnInit{
    selectedBuckets=[];
    allBuckets = [];
    createBucketForm:FormGroup;
    errorMessage = [];
    createBucketDisplay=false;
    showLife = false;
    backendsOption = [];
    lifeOperation = [];
    allBackends = [];
    allTypes = [];
    excute = [];
    dataAnalysis = [];
    createMigrateShow = false;
    selectTime = true;
    showAnalysis = false;
    migrationForm:FormGroup;
    analysisForm:FormGroup;
    bucketOption = [];
    availbucketOption =[];
    backendMap = new Map();
    selectedBucket = {
        name:"",
        id:""
    };
    selectType;
    constructor(
        public I18N: I18NService,
        private router: Router,
        private ActivatedRoute:ActivatedRoute,
        private confirmationService: ConfirmationService,
        private fb:FormBuilder,
        private BucketService: BucketService,
        private MigrationService:MigrationService
    ){
        this.createBucketForm = this.fb.group({
            "backend":[""],
            "backend_type":[""],
            "name":[""]
        });
        this.migrationForm = this.fb.group({
            "migrationName":[""],
            "destBucket":[""],
            "excutingTime":[""],
            "rule":[""],
            "deleteSrcObject":[""],
            "execute": ["true"]
        });
        this.analysisForm = this.fb.group({
            "analysisCluster":[""],
            "ak":[""],
            "sk":[""]
        });
    }

    ngOnInit() {
        this.allBuckets = [
            {
                name:"test",
                backend:"OS_ch_beijing_eastern",
                created:"2018-02-25 07:30:12",
            },
            {
                name:"bucket_s3",
                backend:"OS_ch_beijing_western",
                created:"2018-02-25 07:30:12",
            }
        ];
        this.backendsOption = [];
        this.lifeOperation =[{
            label:'Migration',
            value:'Migration'
        },
        {
            label:'Delete',
            value:'Delete'
        }];
        this.allBackends = [{
            label:'AWS S3',
            value:'AWS S3'
        },
        {
            label:'MicrosoftAzure Blob Storage',
            value:'MicrosoftAzure Blob Storage'
        },
        {
            label:'Huawei HWC',
            value:'Huawei HWC'
        },
        {
            label:'Huawei FusionCloud',
            value:'Huawei FusionCloud'
        }
        ];
        this.getBuckets();
        this.getBackends();
    }
    showcalendar(){
        this.selectTime = !this.selectTime;
        // if (this.migrationForm.value.execute.length !== 0) {
        //     this.selectTime = false;
        // } else {
        //     this.selectTime = true;
        // }
    }
    showDetail(){
        this.showAnalysis = !this.showAnalysis;
    }
    configMigration(bucket){
        this.availbucketOption = [];
        this.createMigrateShow=true;
        this.selectedBucket = bucket;

        this.bucketOption.forEach((value,index)=>{
            if(this.backendMap.get(value.label) !== this.backendMap.get(bucket.name)){
                this.availbucketOption.push({
                    label:value.label,
                    value:value.value
                });
            }
        });
    }
    getBuckets() {
        this.allBuckets = [];
        this.bucketOption = [];
        this.BucketService.getBuckets().subscribe((res) => {
            this.allBuckets = res.json();
            this.allBuckets.forEach(item=>{
                this.bucketOption.push({
                    label:item.name,
                    value:item.name
                });
                this.backendMap.set(item.name,item.backend);
            });
        });
    }

    getTypes() {
        this.allTypes = [];
        this.BucketService.getTypes().subscribe((res) => {
            res.json().forEach(element => {
                this.allTypes.push({
                    label: element.name,
                    value: element.id
                })
            });
        });
    }
    createMigration(){
        let param = {
            "name": this.migrationForm.value.migrationName,
            "srcBucket": this.selectedBucket.name,
            "destBucket": this.migrationForm.value.destBucket,
            "rule": this.migrationForm.value.rule,
            "deleteSrcObject": this.migrationForm.value.deleteSrcObject.length !== 0,
        }
        if(!this.selectTime){
            let param2 = {
                "excutingTime":this.migrationForm.value.excutingTime ,
            }
            Object.assign(param,param2);
        }
        if(this.showAnalysis){
            let param3 = {
                "analysisCluster": this.analysisForm.value.analysisCluster,
                "ak": this.analysisForm.value.ak,
                "sk": this.analysisForm.value.sk,
            }
            Object.assign(param,param3);
        }
        this.MigrationService.createMigration(param).subscribe((res) => {
            this.createMigrateShow = false;
        });
    }
    getBackendsByTypeId() {
        this.backendsOption = [];
        this.BucketService.getBackendsByTypeId(this.selectType).subscribe((res) => {
            res.json().forEach(element => {
                this.backendsOption.push({
                    label: element.name,
                    value: element.name
                })
            });
        });
    }

    getBackends() {
        this.allBackends = [];
        this.BucketService.getBckends().subscribe((res) => {
            res.json().forEach(element => {
                this.allBackends.push({
                    label: element.name,
                    value: element.name
                })
            });
        });
    }

    creatBucket(){
        console.log(this.createBucketForm.value);
        let param = {
            name:this.createBucketForm.value.name,
            backend_type:this.createBucketForm.value.backend_type,
            backend:this.createBucketForm.value.backend,
        };
        this.BucketService.createBucket(param).subscribe(()=>{
            this.createBucketDisplay = false;
            this.getBuckets();
        });
        
    }
    showCreateForm(){
        this.createBucketDisplay = true;
        this.getTypes();
    }
    deleteBucket(bucket){
        let msg = "<div>Are you sure you want to delete the Bucket ?</div><h3>[ "+ bucket.name +" ]</h3>";
        let header ="Delete";
        let acceptLabel = "Delete";
        let warming = true;
        this.confirmDialog([msg,header,acceptLabel,warming,"delete"], bucket)
    }
    configLife(bucket){
        this.showLife = true;
    }
    confirmDialog([msg,header,acceptLabel,warming=true,func], bucket){
        this.confirmationService.confirm({
            message: msg,
            header: header,
            acceptLabel: acceptLabel,
            isWarning: warming,
            accept: ()=>{
                try {
                    let id = bucket.id;
                    this.BucketService.deleteBucket(id).subscribe((res) => {
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
