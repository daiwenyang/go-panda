import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { I18NService, Utils } from 'app/shared/api';

@Component({
  selector: 'bucket-detail',
  templateUrl: './bucket-detail.component.html',
  styleUrls: [

  ]
})
export class BucketDetailComponent implements OnInit {
  label;
  buketName:string="";
  items = [{
    label:"Buckets",
    url:["/block","fromBuckets"]
  }];
  allDir = [];
  selectedDir = [];
  uploadDisplay = false;
  selectedSpecify = [];
  showBackend = false;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    public I18N:I18NService
  ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params) => this.buketName = params.bucketId);
    this.items.push({
      label:this.buketName,
      url:["bucketDetail",this.buketName],
    });
    this.allDir = [{
      name:"Case-image.jpg",
      size:"101.03 KB",
      modified:"2018-02-25 07:30:12"
    }]
  }

  getFiles() {
    
  }
  showDetail(){
    if(this.selectedSpecify.length !== 0){
      this.showBackend = true;
    }else{
      this.showBackend = false;
    }
  }
}
