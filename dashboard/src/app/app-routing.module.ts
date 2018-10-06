import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './business/home/home.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, outlet: 'settings'},
    {path: 'service', loadChildren: './business/service/service.module#ServiceModule'},
    {path: 'block', loadChildren: './business/block/block.module#BlockModule'},
    {path: 'createVolume', loadChildren: './business/block/create-volume/create-volume.module#CreateVolumeModule'},
    {path: 'volumeDetails/:volumeId', loadChildren: './business/block/volume-detail/volume-detail.module#VolumeDetailModule'},
    {path: 'cloud', loadChildren: './business/cloud/cloud.module#CloudModule'},
    {path: 'profile', loadChildren: './business/profile/profile.module#ProfileModule'},
    {path: 'createProfile', loadChildren: './business/profile/createProfile/createProfile.module#CreateProfileModule'},
    {path: 'modifyProfile/:profileId', loadChildren: './business/profile/modifyProfile/modifyProfile.module#ModifyProfileModule'},
    {path: 'resource', loadChildren: './business/resource/resource.module#ResourceModule'},
    {path: 'identity', loadChildren: './business/identity/identity.module#IdentityModule'},
    {path: 'volumeGroupDetails/:groupId', loadChildren: './business/block/volume-group-detail/volume-group-detail.module#VolumeGroupDetailModule'},
    {path: 'block/:fromRoute', loadChildren: './business/block/block.module#BlockModule'},
    {path: 'dataflow', loadChildren: './business/dataflow/dataflow.module#DataflowModule'},
    {path: 'bucketDetail/:bucketId', loadChildren: './business/block/bucket-detail/bucket-detail.module#BucketDetailModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
