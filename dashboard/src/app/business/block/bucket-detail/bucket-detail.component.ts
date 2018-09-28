import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { I18NService, Utils } from 'app/shared/api';
import { BucketService} from '../buckets.service';

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
    public I18N:I18NService,
    private BucketService: BucketService
  ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params) => {

      this.BucketService.getBucketById(params.bucketId).subscribe((res) => {
        let bucket = res.json();
        this.buketName = bucket.name;
        this.items.push({
          label: this.buketName,
          url: ["bucketDetail", this.buketName],
        });
        this.BucketService.getFilesByBucketId(bucket.id).subscribe((res) => {
          this.allDir = res.json();
        });
      });
    }
    );
  }
  showDetail(){
    if(this.selectedSpecify.length !== 0){
      this.showBackend = true;
    }else{
      this.showBackend = false;
    }
  }
}
