import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { I18NService, Utils } from 'app/shared/api';

@Component({
  selector: 'migration-detail',
  templateUrl: './migration-detail.component.html',
  styleUrls: [

  ]
})
export class MigrationDetailComponent implements OnInit {
  
  constructor(
    private ActivatedRoute: ActivatedRoute,
    public I18N:I18NService
  ) { }

  ngOnInit() {
    
  }

}
