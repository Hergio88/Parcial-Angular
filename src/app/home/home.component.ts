import { Component, OnInit } from '@angular/core';
import { RickMortyService } from '../rick-morty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  characters: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private rickMortyService: RickMortyService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.rickMortyService.getCharacters(this.currentPage, this.pageSize).subscribe(
      (characters: any[]) => {
        this.characters = characters;
      },
      (error) => {
        console.error('Error fetching characters', error);
      }
    );
  }

  loadNextPage(): void {
    this.currentPage++;
    this.loadCharacters();
  }

  loadPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

}
