import { Component, OnInit, Input } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import {Cast} from '../../cast';
import {People} from '../../people';
import {PeopleService} from '../../people.service';
import {DatePipe} from '@angular/common';
import {DateFormatter} from '@angular/common/src/pipes/deprecated/intl';

@Component({
  selector: 'app-cast-viewer',
  templateUrl: './cast-viewer.component.html',
  styleUrls: ['./cast-viewer.component.scss']
})
export class CastViewerComponent implements OnInit {
  @Input() cast: Cast[];
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
    const date = new Date(this.selectedPerson.birthday);
    const timeDiff = Math.abs(Date.now() - date.getDate());
    const diffYears = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffYears / 365;
  }
  getCastPosterUrl(): string {
    return 'url(\'https://image.tmdb.org/t/p/w185/' + this.selectedPerson.profile_path + '\')';
  }
}
