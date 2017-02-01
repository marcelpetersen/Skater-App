import { Component, OnInit } from '@angular/core';
import { SkateSpot } from '../../app/skate-spot.model';
import { SkateSpotService } from '../../app/skate-spot.service';
import { EditSpotComponent } from '../../components/edit-spot/edit-spot';
import { MapComponent } from '../../components/map/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { FeatureModel } from '../../app/feature-model'
import { FeatureFilter } from '../../pipes/feature-filter';
import { DetailPage } from '../detail/detail';
import { AddSpotComponent } from '../../components/add-spot/add-spot';
import { Geolocation } from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SkateSpotService]
})
export class HomePage implements OnInit {

  skatespots: FirebaseListObservable<any[]>;
  skateSpotToDisplay;
  skateSpotToDisplayKey: string = "";
  features: FeatureModel;
  testFilter: FeatureModel = {
      stairs: false,
      rails: false,
      mannypad: false,
      gap: false,
      ledge: false,
      bank: false,
      wallride: false,
      drop: false,
      transitions: false
  }

  constructor(public navCtrl: NavController, public skateSpotService: SkateSpotService) {

  }

  ngOnInit() {
    this.skatespots = this.skateSpotService.getSpots();
  }

  editSpot(key: string) {
    this.skateSpotToDisplay = this.skateSpotService.getSkateSpot(key);
    this.skateSpotService.getSkateSpot(key).subscribe(dataEmitted => {
      this.features = dataEmitted.features;
    })
  }

  deleteSpot(key: string) {
    this.skateSpotService.deleteSpot(key);
  }

  currentLocation() {
        Geolocation.getCurrentPosition().then((resp) => {
        alert(resp.coords.latitude + resp.coords.longitude);
    });
  }

  viewSpot(spot){
    console.log(spot);
    this.navCtrl.push(DetailPage, {
      spot:spot
    })
  }

  newSpot() {
    this.navCtrl.push(AddSpotComponent);
  }

}
