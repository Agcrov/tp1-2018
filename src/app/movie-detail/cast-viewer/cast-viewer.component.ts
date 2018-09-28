import {Component, Input, OnInit} from '@angular/core';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

import {Cast} from '../../cast';
import {People} from '../../people';
import {PeopleService} from '../../people.service';
import {Movie} from '../../movie';

import * as moment from 'moment';

@Component({
  selector: 'app-cast-viewer',
  templateUrl: './cast-viewer.component.html',
  styleUrls: ['./cast-viewer.component.scss']
})
export class CastViewerComponent implements OnInit {
  @Input() cast: Cast[];
  @Input() movie: Movie;
  selectedPerson: People;

  faInfoCircle = faInfoCircle;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.onSelect(this.cast[0].id);
  }
  onSelect(castId: number): void {
    this.peopleService.getPeopleById(castId)
      .subscribe(result => this.selectedPerson = result);
  }
  getAgeAtFilmRelease(): number {
    const movieDate = moment(this.movie.release_date, 'YYYY-MM-DD');
    const actorDate = moment(this.selectedPerson.birthday, 'YYYY-MM-DD');
    const resp = movieDate.diff(actorDate, 'years');
    return resp;
  }
  getCastPosterUrl(): string {
    if (this.selectedPerson.profile_path) {
      return 'url(\'https://image.tmdb.org/t/p/w185/' + this.selectedPerson.profile_path + '\')';
    }
    return 'url(\'/assets/avatar_no_img_128.png\')';
  }
  getCastAvatarUrl(person: Cast): string{
    if(person.profile_path){
      return 'https://image.tmdb.org/t/p/w185/' + person.profile_path;
    }
    return '../../../assets/avatar_no_img_64.png';
  }
}
