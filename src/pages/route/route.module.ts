import { NgModule }        from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoutePage }       from './route';
import { Component }       from '@angular/core';
import { NavController }   from 'ionic-angular';

@NgModule({
  declarations: [
    RoutePage,
  ],
  imports: [
    IonicPageModule.forChild(RoutePage),
  ],
})

export class RoutePageModule {}
