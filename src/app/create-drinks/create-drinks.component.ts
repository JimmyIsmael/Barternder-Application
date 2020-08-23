import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrinkModel } from '../drink.model';
import { DrinkService } from '../drink.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-drinks',
  templateUrl: './create-drinks.component.html',
  styleUrls: ['./create-drinks.component.css']
})
export class CreateDrinksComponent implements OnInit {
  errorInForm: boolean;
  constructor(public drinkService: DrinkService, public router: Router) { }

  ngOnInit() {
  }

  onSave(form: NgForm) {
    if ( form.invalid ) { // Validating form has data
      console.log('returned');
      this.errorInForm = true;
      return;
    }

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
  }
}
