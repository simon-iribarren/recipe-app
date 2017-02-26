import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import firebase from 'firebase';

import {TabsPage} from "../pages/tabs/tabs";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import {AuthService} from "../services/auth";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;

  @ViewChild('nav') nav: NavController;

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close()

  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage)
  }

  constructor(platform: Platform,
              private menuCtrl: MenuController,
              private authService: AuthService) {
    firebase.initializeApp({
      apiKey: "AIzaSyAqSgFAVim7JyJMiC2FUJXjtN2zte4m_sw",
      authDomain: "ionic2-recipe-71e43.firebaseapp.com",
      databaseURL: "https://ionic2-recipe-71e43.firebaseio.com",
      storageBucket: "ionic2-recipe-71e43.appspot.com",
      messagingSenderId: "1083249277286"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
