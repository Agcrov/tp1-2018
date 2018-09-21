import { Component, OnInit, Input } from '@angular/core';
import {Cast} from '../../cast';
import {People} from '../../people';
import {PeopleService} from '../../people.service';

@Component({
  selector: 'app-cast-viewer',
  templateUrl: './cast-viewer.component.html',
  styleUrls: ['./cast-viewer.component.scss']
})
export class CastViewerComponent implements OnInit {
  @Input() cast: Cast[];
  selectedPerson: People;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.onSelect(this.cast[0].id);
  }
  onSelect(castId: number): void{
    this.peopleService.getPeopleById(castId)
      .subscribe(result => this.selectedPerson = result);
  }

  getCastPosterUrl(): string {
    return 'url(\'https://image.tmdb.org/t/p/w185/' + this.selectedPerson.profile_path + '\')';
  }
}
