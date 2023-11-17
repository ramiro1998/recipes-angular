import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchItem = new EventEmitter<string>();
  inputText: string = ''

  constructor() {
  }

  searchRecipes() {
    this.searchItem.emit(this.inputText);
  }


}
