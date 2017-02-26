import {Recipe} from "../models/recipe.model";
import {Ingredient} from "../models/ingredients.model";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx';


@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor(private http: Http, private authService: AuthService) {
  }

  addRecipe(title: string,
            description: string,
            difficulty: string,
            ingredients: Ingredient[],) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  getRecipes() {
    return this.recipes.slice()
  }

  updateRecipe(index: number,
               title: string,
               description: string,
               difficulty: string,
               ingredients: Ingredient[],) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients)
  }

  removeRecipe(index: number) {
    this.recipes.slice(index, 1)
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic2-recipe-71e43.firebaseio.com/' + userId + '/recipes.json?auth=' + token,
      this.recipes)
      .map((response: Response) => {
        return response.json()
      })

  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;

    return this.http.get('https://ionic2-recipe-71e43.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
      .map((response: Response) => {
        const recipes = response.json() ? response.json() : [];
        for (let item of recipes) {
          if (!item.hasOwnProperty('ingredients')) {
            item.ingredients = [];
          }

        }
        return recipes;
      })
      .do((recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes

        }
      })


  }

}
