import { CommonModule } from '@angular/common';
import { ListgroupComponent } from './listgroup/listgroup.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ListgroupComponent
  ],
  declarations: [ListgroupComponent]
})
export class SharedModule { }
