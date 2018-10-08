import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, ViewChild, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { I18NService, ParamStorService} from 'app/shared/api';
import { Http } from '@angular/http';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { AvailabilityZonesService } from '../resource.service';

@Component({
    selector: 'storage-table',
    templateUrl: './storage.html',
    styleUrls: [],
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
export class StorageComponent implements OnInit{

    storages = [];
    typeJSON = {};
    constructor(
        public I18N: I18NService,
        private http: Http,
        private paramStor: ParamStorService,
        private service: AvailabilityZonesService
    ){}
    
    ngOnInit() {
        this.storages = [];
        this.getType();
    }
    getType(){
        let url = 'v1beta/{project_id}/type';
        this.http.get(url).subscribe((res)=>{
            let all = res.json();
            all.forEach(element => {
                this.typeJSON[element.id] = element.name;
            });
            this.listStorage();
        });
    }
    listStorage(){
        this.storages = [];
        this.service.getBackend({}).subscribe((res) => {
            res.json().forEach(ele => {
                let [name,ip,type,status,description,region,az] = [ele.name, ele.endpoint, this.typeJSON[ele.type],"Enabled", ele.description, ele.region, "default"];
                this.storages.push({name,ip,type,status,description,region,az});
            })
        });
        // let reqUser: any = { params:{} };
        // let user_id = this.paramStor.CURRENT_USER().split("|")[1];
        // this.http.get("/v3/users/"+ user_id +"/projects", reqUser).subscribe((objRES) => {
        //     let project_id;
        //     objRES.json().projects.forEach(element => {
        //         if(element.name == "admin"){
        //             project_id = element.id;
        //         }
        //     })

        //     let reqPool: any = { params:{} };
        //     this.http.get("/v1beta/"+ project_id +"/pools", reqPool).subscribe((poolRES) => {
        //         let reqDock: any = { params:{} };
        //         this.http.get("/v1beta/"+ project_id +"/docks", reqDock).subscribe((dockRES) => {
        //             dockRES.json().forEach(ele => {
        //                 let zone = poolRES.json().filter((pool)=>{
        //                     return pool.dockId == ele.id;
        //                 })[0].availabilityZone;
        //                 let [name,ip,status,description,region,az] = [ele.name, ele.endpoint.split(":")[0], "Enabled", ele.description, "default_region", zone];
        //                 this.storages.push({name,ip,status,description,region,az});
        //             })
        //             console.log(this.storages);
        //         })
        //     })
        // })
    }
    
}

