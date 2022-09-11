import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent {

  searchFilters = {
    titolo: '',
    genere: '',
    autore: '',
    casaEditrice: '',
  }

  books: {title: string, author: string, publisher: string, genre: string, isbn: string}[] = [];

  advanced = false;
  toggleAdvanced() {
    this.advanced = !this.advanced;
  }

  search() {
    console.log(this.searchFilters);
    this.httpClient.get('http://localhost:3000/api/books', {
      params: this.searchFilters
    }).subscribe((response: any) => {
      console.log(response);
      this.books = response;
    });
  }

  constructor(private httpClient: HttpClient) { 
    this.search();
  }

  ngOnInit(): void {
  }

}
