import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { I18NService, Utils } from 'app/shared/api';
import { BucketService} from '../buckets.service';
// import { FileUploader } from 'ng2-file-upload';
import { MenuItem ,ConfirmationService} from '../../../components/common/api';

@Component({
  selector: 'bucket-detail',
  templateUrl: './bucket-detail.component.html',
  styleUrls: [

  ],
  providers: [ConfirmationService],
})
export class BucketDetailComponent implements OnInit {
  selectFile;
  label;
  uploadFileDispaly:boolean = false;
  buketName:string="";
  bucketId:string="";
  items = [{
    label:"Buckets",
    url:["/block","fromBuckets"]
  }];
  allDir = [];
  selectedDir = [];
  uploadDisplay = false;
  selectedSpecify = [];
  showBackend = false;
  // private uploader: FileUploader;
  params;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    public I18N:I18NService,
    private BucketService: BucketService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params) => {
      // this.uploader = new FileUploader({
      //   url: 'v1beta/file/upload' + "?bucket_id=" + params.bucketId,
      //   method: 'POST',
      //   itemAlias: "uploadedfile",
      //   autoUpload: false
      // })

      this.bucketId = params.bucketId;
      this.BucketService.getBucketById(params.bucketId).subscribe((res) => {
        let bucket = res.json();
        this.buketName = bucket.name;
        this.items.push({
          label: this.buketName,
          url: ["bucketDetail", this.buketName],
        });
      });
      this.getFile();
    }
    );
  }
  
  getFile() {
    this.BucketService.getFilesByBucketId(this.params.bucketId).subscribe((res) => {
      this.allDir = res.json();
    });

  }

  showDetail(){
    if(this.selectedSpecify.length !== 0){
      this.showBackend = true;
    }else{
      this.showBackend = false;
    }
  }

    /**
   * 上传文件内容变化时执行的方法
   * @param event
   */
  selectedFileOnChanged(event: any) {
    // 这里是文件选择完成后的操作处理
    // alert('上传文件改变啦');
    if(event.target.files[0]){
      let file = event.target.files[0];
      this.selectFile = file;
    }
  }

  /**
   * 上传文件方法
   */
  uploadFile() {
    let form = new FormData();
    form.append("file", this.selectFile);
    
    
    this.BucketService.uploadFile(form).subscribe((res) => {
      let data = res.json();
      if(data.isExsit){
        alert("Exsit");
        this.uploadDisplay = false;
      }else{
        let params = {};
        params['name'] = data.originalFilename;
        params['size'] = data.size;
        params['bucketID'] = this.bucketId;
        params['backendName'] = "backendName";
        this.BucketService.saveToDB(params).subscribe((res) => {
          this.uploadDisplay = false;
          this.BucketService.getFilesByBucketId(this.bucketId).subscribe((res) => {
            this.allDir = res.json();
          });
        })
      }
    });
    
  }

  downloadFile(file) {
    this.BucketService.downloadFile(file.name).subscribe((res) => {
      
    });
  }

  deleteFile(file){
    let msg = "<div>Are you sure you want to delete the File ?</div><h3>[ "+ file.name +" ]</h3>";
    let header ="Delete";
    let acceptLabel = "Delete";
    let warming = true;
    this.confirmDialog([msg,header,acceptLabel,warming,"delete"], file)
  }

  confirmDialog([msg,header,acceptLabel,warming=true,func], file){
      this.confirmationService.confirm({
          message: msg,
          header: header,
          acceptLabel: acceptLabel,
          isWarning: warming,
          accept: ()=>{
              try {
                  let id = file.id;
                  this.BucketService.deleteFile(id).subscribe((res) => {
                      this.getFile();
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
