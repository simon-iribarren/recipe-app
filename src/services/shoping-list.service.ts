import {Ingredient} from "../models/ingredients.model";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {
  constructor(private http: Http,
              private authService: AuthService) {

  }

  private ingredients: Ingredient[] = [];

  getItems() {
    return this.ingredients.slice()
  }

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items)

  }

  removeItem(index) {
    this.ingredients.slice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic2-recipe-71e43.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token,
      this.ingredients)
      .map((response: Response) => {
        return response.json()
      })

  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic2-recipe-71e43.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
      .map((response: Response) => {
        return response.json()
      })
      .do((ingredients: Ingredient[]) => {
          if (ingredients) {
            this.ingredients = ingredients;

          }

        }
      )

  }
}
