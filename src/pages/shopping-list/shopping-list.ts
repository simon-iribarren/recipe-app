import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shoping-list.service";
import {Ingredient} from "../../models/ingredients.model";
import {PopoverController, LoadingController, AlertController} from "ionic-angular";
import {AuthService} from "../../services/auth";
import {DatabaseOptionsPage} from "../database-options/database-options";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage implements OnInit {
  listItems: Ingredient[] = [];

  constructor(private slService: ShoppingListService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    this.loadItems();
    form.reset();
  }

  ngOnInit() {
    this.loadItems()
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
    {
    }
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({content: 'Please wait...'});
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event})
    popover.onDidDismiss(data => {

      if (!data) {
        return;
      }
      if (data.action == 'load') {
        console.log(data.action);
        loading.present();

        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.slService.fetchList(token)
              .subscribe((list: Ingredient[]) => {
                  loading.dismiss();
                  if (list) {
                    this.listItems = list;
                  } else {
                    this.listItems = [];
                  }
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.json().error);

                })

          })
          .catch()

      }
      else if (data.action == 'store') {
        loading.present();
        console.log(data.action)
        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.slService.storeList(token)
              .subscribe(() => {
                  loading.dismiss();

                  console.log('success')
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.json().error);
                })

          })
          .catch()

      }
    })

  }

  private loadItems() {
    this.listItems = this.slService.getItems();

  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error ocurred',
      message: errorMessage,
      buttons: ['Ok']
    })
    alert.present();

  }


}
