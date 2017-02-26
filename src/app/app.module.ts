import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {RecipesPage} from "../pages/recipes/recipes";
import {RecipePage} from "../pages/recipe/recipe";
import {ShoppingListPage} from "../pages/shopping-list/shopping-list";
import {EditRecipePage} from "../pages/edit-recipe/edit-recipe";
import {TabsPage} from "../pages/tabs/tabs";
import {ShoppingListService} from "../services/shoping-list.service";
import {RecipesService} from "../services/recipes";
import {SignupPage} from "../pages/signup/signup";
import {SigninPage} from "../pages/signin/signin";
import {AuthService} from "../services/auth";
import {DatabaseOptionsPage} from "../pages/database-options/database-options";

@NgModule({
  declarations: [
    MyApp,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    EditRecipePage,
    TabsPage,
    SignupPage,
    SigninPage,
    DatabaseOptionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    EditRecipePage,
    TabsPage,
    SignupPage,
    SigninPage,
    DatabaseOptionsPage

  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService]
})
export class AppModule {}
