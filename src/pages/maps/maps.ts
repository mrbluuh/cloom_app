import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GESTURE_PRIORITY_TOGGLE } from 'ionic-angular/gestures/gesture-controller';
import { NewsfeedProvider } from '../../providers/newsfeed/newsfeed';

declare var google:any;

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  map: any;
  markers: any;
  parkings: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public geolocation: Geolocation, private platform: Platform) {
  }

  refresh(){
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){
    this.platform.ready().then(()=>{
      this.initPage();
    })
  }
    
  initPage(){
    this.geolocation.getCurrentPosition().then(result=>{
      this.loadMap(result.coords.latitude, result.coords.longitude);
    }).catch((err) => {
      console.log('Error getting location', err);
  });
  }

  loadPoint(){
    this.markers = [];

    for(let parking of this.parkings){
      let latLng = new google.maps.LatLng(parking.lat, parking.lng);

      let marker = new google.maps.Marker({
        position: latLng,
        title: parking.name
      });
      let content = `
        <div id="myId" class="item item-thumbnail-left item-text-wrap">
          <ion-item>
            <ion-row>
             <h6> `+ parking.name +`</h6>
            </ion-row>
          </ion-item>
        </div>`;
      
      this.addInfoWindow(marker,content);
      marker.setMap(this.map);
    }

  }


  loadMap(latitude,longitude){
    
    let latLng = new google.maps.LatLng(latitude,longitude);

    let mapOptions  = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let element = document.getElementById('map');

    this.map = new google.maps.Map(element,mapOptions);
    
    let icon = {
      url: 'https://www.rctcbc.gov.uk/SiteElements/Images/Icons/LidoMapMarkers/CarMarker.png',
      scaledSize: new google.maps.Size(30, 50),
    }

    let marker = new google.maps.Marker({
      position: latLng,
      title:'Your Position',
      icon: icon
    });

    let content = `
      <div id="myId" class="item item-thumbnail-left item-text-wrap">
        <ion-item>
          <ion-row>
           <h6> `+ marker.title +`</h6>
          </ion-row>
        </ion-item>
      </div>`;

    this.addInfoWindow(marker, content);
    marker.setMap(this.map);
  }

  
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });

    google.maps.event.addListener(marker, 'click', ()=>{
      infoWindow.open(this.map, marker);
    })
  }

}
