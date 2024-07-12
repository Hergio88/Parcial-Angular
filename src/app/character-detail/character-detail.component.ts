import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CharacterService } from '../character.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  character: any;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');

        // Verificar si 'id' es nulo o no es un número válido
        if (id === null || isNaN(+id)) {
          console.error('Invalid id parameter');
          return of(null); // Emitir un observable con un valor nulo en caso de error
        }

        // Convertir 'id' a un número
        const characterId = +id;

        return this.characterService.getCharacterById(characterId);
      }),
      catchError((error: any) => {
        console.error('Error fetching character details', error);
        return of(null); // Manejar errores de forma segura y emitir un valor nulo
      })
    ).subscribe((data: any) => {
      this.character = data;
    });
  }

}
