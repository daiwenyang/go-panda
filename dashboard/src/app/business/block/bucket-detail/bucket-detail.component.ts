import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { I18NService, Utils } from 'app/shared/api';
import { BucketService} from '../buckets.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'bucket-detail',
  templateUrl: './bucket-detail.component.html',
  styleUrls: [

  ]
})
export class BucketDetailComponent implements OnInit {
  label;
  uploadFileDispaly:boolean = false;
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
  private uploader: FileUploader;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    public I18N:I18NService,
    private BucketService: BucketService
  ) { }

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params) => {
      this.uploader = new FileUploader({
        url: 'v1beta/file/upload' + "?bucket_id=" + params.bucketId,
        method: 'POST',
        itemAlias: "uploadedfile",
        autoUpload: false
      })

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

    /**
   * 上传文件内容变化时执行的方法
   * @param event
   */
  selectedFileOnChanged(event: any) {
    // 这里是文件选择完成后的操作处理
    // alert('上传文件改变啦');
    console.log(event.target.value);
    console.log(event);
  }

  /**
   * 上传文件方法
   */
  uploadFile() {
    alert('执行上传文件');
    // 上传
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        const tempRes = response;
        alert(response);
      } else {
        // 上传文件后获取服务器返回的数据错误
        alert('上传失败');
      }
    };
    // onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any;
    this.uploader.queue[0].upload(); // 开始上传
    // this.uploader.queue[0].onSuccess()
    alert('上传之后');
  }

  downloadFile(file) {
    this.BucketService.downloadFile(file.name).subscribe((res) => {
      
    });
  }

}
