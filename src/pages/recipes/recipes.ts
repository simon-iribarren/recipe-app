import {Component} from '@angular/core';
import {NavController, PopoverController, LoadingController, AlertController} from "ionic-angular";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {Recipe} from "../../models/recipe.model";
import {RecipesService} from "../../services/recipes";
import {RecipePage} from "../recipe/recipe";
import {AuthService} from "../../services/auth";
import Database = firebase.database.Database;
import {DatabaseOptionsPage} from "../database-options/database-options";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

  constructor(private navCtrl: NavController,
              private recipeService: RecipesService,
              private popoverCtrl: PopoverController,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private authService: AuthService) {
  }

  recipes: Recipe[];

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'})

  }

  ionViewWillEnter() {
    this.recipes = this.recipeService.getRecipes()
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index})

  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({content: 'Please wait...'});
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event})
    popover.onDidDismiss(data => {
      if(!data){
        return;
      }
      if (data.action == 'load') {
        console.log(data.action);
        loading.present();

        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.recipeService.fetchList(token)
              .subscribe((list: Recipe[]) => {
                  loading.dismiss();
                  if (list) {
                    this.recipes = list;
                  } else {
                    this.recipes = [];
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
            this.recipeService.storeList(token)
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

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error ocurred',
      message: errorMessage,
      buttons: ['Ok']
    })
    alert.present();

  }


}
