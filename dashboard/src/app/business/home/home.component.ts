import { Component, OnInit, ViewContainerRef, ViewChild, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { Http } from '@angular/http';
import { ParamStorService } from 'app/shared/api';
import { ProfileService } from 'app/business/profile/profile.service';
import { Observable } from "rxjs/Rx";
import { I18NService } from 'app/shared/api';

@Component({
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.scss'
    ]
})
export class HomeComponent implements OnInit {
    items = [];
    chartDatas;
    chartDatasbar;
    option;
    chartBarOpion;
    profileOptions = [];
    lineData_nums;
    lineData_capacity;
    showAdminStatis = true;
    tenants =[];
    lineData ={};
    lineOption = {};
    showRgister = false;
    allBackends = [];
    allRegions = [];
    registerBackend = {
        type: {
            values: ['AWS S3', 'MicrosoftAzure Blob Storage', 'Huawei HWC', 'Huawei FusionCloud'],
            value: 'AWS S3'
        },
        region: {
            values: [
                { "name": this.I18N.keyID['sds_resource_region_default'], "role": "Primary Region" }
            ],
            value: this.I18N.keyID['sds_resource_region_default']
        },
        name: {value: ""},
        endpoint: {value: ""},
        bucket: {value: ""},         
        accessKey: {value: ""},  
        secretKey: {value: ""}
    }
    constructor(
        private http: Http,
        private paramStor: ParamStorService,
        private profileService: ProfileService,
        private I18N: I18NService,
    ) { }

    ngOnInit() {
        if(this.paramStor.CURRENT_USER().split("|")[0] == "admin"){
            this.showAdminStatis = true;
            this.getCountData();
        }else{
            this.showAdminStatis = false;
            this.getTenantCountData();
        }

        this.items = [
            {
                countNum: 0,
                label: this.I18N.keyID["sds_home_tenants"]
            },
            {
                countNum:0,
                label: this.I18N.keyID["sds_home_users"]
            },
            {
                countNum: 0,
                label: this.I18N.keyID["sds_home_storages"]
            },
            {
                countNum: 0,
                label: this.I18N.keyID["sds_home_pools"]
            },
            {
                countNum: 0,
                label: this.I18N.keyID["sds_home_volumes"]
            },
            {
                countNum: 0,
                label:this.I18N.keyID["sds_home_snapshots"]
            },
            {
                countNum: 0,
                label: this.I18N.keyID["sds_home_replications"]
            },
            {
                countNum: 0,
                label: "Cross-Region Replications"
            },
            {
                countNum: 0,
                label: "Cross-Region Migrations"
            }
        ];

        
        this.option = {
            cutoutPercentage: 80,
            title: {
                display: false,
                text: 'My Title',
                fontSize: 12
            },
            legend: {
                labels: {
                    boxWidth: 12
                },
                display: true,
                position: 'right',
                fontSize: 12
            }
        };
        this.chartBarOpion= {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }]
            },
            legend: {
                display: false
            }
        }

        this.lineData_capacity = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Capacity(GB)',
                    data: [10, 11, 20, 160, 156, 195, 200],
                    fill: false,
                    borderColor: '#4bc0c0'
                }
            ]
        }

        this.lineData_nums = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Volumes',
                    data: [10, 23, 40, 38, 86, 107, 190],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        }
        this.lineOption = {
            title: {
                display: false,
                text: 'My Title',
                fontSize: 12
            },
            legend: {
                labels: {
                    boxWidth: 12
                },
                display: false,
                position: 'right',
                fontSize: 12
            }
        };
        this.lineData = {
            labels: [[], [], [], [], [],[],[]],
            datasets: [
                {
                    //label: 'First Dataset',
                    data: [2,4,8,11,14,16,21],
                    fill: true,
                    borderColor: '#4bc0c0'
                }
            ]
        }
        //['AWS S3', 'MicrosoftAzure Blob Storage', 'Huawei HWC', 'Huawei FusionCloud'],
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
        this.allRegions = [{
            label:'region_beijing',
            value:'region_beijing'
        },
        {
            label:'region_chengdu',
            value:'region_chengdu'
        }
        ];
    }

    getProfiles() {
        this.profileService.getProfiles().subscribe((res) => {
            let profiles = res.json();
            profiles.forEach(profile => {
                this.profileOptions.push({
                    name: profile.name,
                    id: profile.id,
                    capacity: 0
                })
            });
        });
    }

    listTenants() {
        let request: any = { params:{} };
        request.params = {
            "domain_id": "default"
        }

        this.http.get("/v3/projects", request).subscribe((res) => {

            this.items[0].countNum = res.json().projects.length;
            this.tenants = res.json().projects;
            this.tenants.forEach((item, i)=>{
                if(item.name == "admin"){
                    this.getAllvolumes(item.id, this.tenants.length - 1);
                    this.getAllSnapshots(item.id);
                    this.getAllReplications(item.id);
                    this.getAllPools(item.id);
                    this.getAllDocks(item.id);
                }
            });


        });
    }
    listUsers(){
        let request: any = { params:{} };
        request.params = {
            "domain_id": "default"
        }
        this.http.get("/v3/users", request).subscribe((res) => {
            this.items[1].countNum = res.json().users.length;
        });
    }
    getAllvolumes(projectId, index?){
        let url = 'v1beta/'+projectId+'/block/volumes';
        this.http.get(url).subscribe((res)=>{
            this.items[4].countNum = this.items[4].countNum + res.json().length;

            if(this.showAdminStatis){
                res.json().forEach(volume => {
                    this.profileOptions.forEach(profile => {
                        if(volume.profileId == profile.id){
                            profile.capacity = profile.capacity + volume.size;
                        }
                    });
                });

                if(index == (this.tenants.length-1)){
                    let [chartData, chartLabel] = [[],[]];
                    this.profileOptions.forEach(ele=>{
                        chartData.push(ele.capacity);
                        chartLabel.push(ele.name);
                    });

                    this.chartDatasbar = {
                        labels: chartLabel,
                        datasets: [{
                            label:"Used Capacity (GB)",
                            backgroundColor: '#42A5F5',
                            data: [chartData]
                        }]
                    }
                }
            }
        });
    }
    getAllSnapshots(projectId){
        let url = 'v1beta/'+projectId+'/block/snapshots';
        this.http.get(url).subscribe((res)=>{
            this.items[5].countNum = this.items[5].countNum + res.json().length;
        });
    }
    getAllReplications(projectId){
        let url = 'v1beta/'+projectId+'/block/replications';
        this.http.get(url).subscribe((res)=>{
            if(res.json()){
                this.items[6].countNum = this.items[6].countNum + res.json().length;
            }
        });
    }
    getAllPools(projectId){
        let url = 'v1beta/'+projectId+'/pools';
        this.http.get(url).subscribe((res)=>{
            this.items[3].countNum = this.items[3].countNum + res.json().length;

            let [storCapacityTotal, storCapacityFree]=[0,0];
            res.json().forEach(element => {
                storCapacityTotal = storCapacityTotal + element.totalCapacity;
                storCapacityFree = storCapacityFree + element.freeCapacity;
            });

            this.chartDatas = {
                labels: [this.I18N.keyID["sds_home_used_capacity"] + " (GB)",this.I18N.keyID["sds_home_free_capacity"] + " (GB)"],
                datasets: [
                    {
                        label: 'high_capacity',
                        data: [(storCapacityTotal-storCapacityFree), storCapacityFree],
                        backgroundColor: [
                            "#438bd3",
                            "rgba(224, 224, 224, .5)"
                        ]
                    }]
            };
        });
    }
    getAllDocks(projectId){
        let url = 'v1beta/'+projectId+'/docks';
        this.http.get(url).subscribe((res)=>{
            this.items[2].countNum = this.items[2].countNum + res.json().length;
        });
    }
    getCountData(){
        this.getProfiles();
        this.listTenants();
        this.listUsers();
    }

    getTenantCountData(){
        let tenantId = this.paramStor.CURRENT_TENANT().split("|")[1];
        this.getAllvolumes(tenantId);
        this.getAllSnapshots(tenantId);
        this.getAllReplications(tenantId);
    }
    
    EvenCompEllipse(context, x, y, a, b){
        context.save();
        //选择a、b中的较大者作为arc方法的半径参数
        var r = (a > b) ? a : b; 
        var ratioX = a / r; //横轴缩放比率
        var ratioY = b / r; //纵轴缩放比率
        context.scale(ratioX, ratioY); //进行缩放（均匀压缩）
        context.beginPath();
        //从椭圆的左端点开始逆时针绘制
        context.moveTo((x + a) / ratioX, y / ratioY);
        context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI);
        context.closePath();
        context.restore();
        context.stroke();
    };

    // 创建backend
    onSubmit(){
        console.log(this.registerBackend);
        let param = {
            "name": this.registerBackend.name.value,
            "type": this.registerBackend.type.value,
            "region": this.registerBackend.region.value, 
            "endpoint": this.registerBackend.endpoint.value,
            "bucket": this.registerBackend.bucket.value,
            "secretKey": this.registerBackend.secretKey.value,
            "accessKey": this.registerBackend.accessKey.value
        };
        this.http.post("v1beta/{project_id}/backend", param).subscribe((res) => {
            console.log(res);
            this.showRgister = false;
        });
    }
}
