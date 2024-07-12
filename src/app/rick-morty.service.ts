import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {

  private apiUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  getCharacters(page: number, pageSize: number): Observable<any> {
    const offset = (page - 1) * pageSize;
    return this.http.get(`${this.apiUrl}?page=${page}`).pipe(
      map((response: any) => {
        const characters = response.results;
        return characters.slice(offset, offset + pageSize);
      })
    );
  }
}
