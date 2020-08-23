import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrinkModel } from '../drink.model';
import { DrinkService } from '../drink.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-drinks',
  templateUrl: './create-drinks.component.html',
  styleUrls: ['./create-drinks.component.css']
})
export class CreateDrinksComponent implements OnInit {
  errorInForm: boolean;
  drinkId: number;
  drink: DrinkModel;
  private mode = 'create';
  constructor(public drinkService: DrinkService, public router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      this.drinkId = params['drinkId'];
    });
    if (this.drinkId) {
      this.mode = 'edit';

      this.drinkService.getDrink(this.drinkId).subscribe((drinksReturned) => {
        // tslint:disable-next-line: triple-equals
        if (drinksReturned != undefined) {
          this.drink = drinksReturned.results[0];
          console.log(this.drink);
         }
      });
    } else {
      this.mode = 'create';
      this.drinkId = null;
      this.drink = null;
    }
  }

  onSave(form: NgForm) {
    if ( form.invalid ) { // Validating form has data
      console.log('returned');
      this.errorInForm = true;
      return;
    }


    if (this.mode === 'create') {
      const drink: DrinkModel = {
        id: null,
        name: form.value.drinkName,
        price: form.value.drinkPrice,
        description: form.value.description,
        recipe: form.value.recipe
      };

      this.drinkService.saveDrink(drink).subscribe((responseData) => {
        if (responseData.drinkCreated) {
          this.router.navigate(['/list-drinks']);
        }
      });
    } else {
      const drink: DrinkModel = {
        id: form.value.drinkId,
        name: form.value.drinkName,
        price: form.value.drinkPrice,
        description: form.value.description,
        recipe: form.value.recipe
      };

      this.drinkService.editDrink(drink).subscribe((responseData) => {
        if (responseData.drinkCreated) {
          this.router.navigate(['/list-drinks']);
        }
      });
    }
  }
}
