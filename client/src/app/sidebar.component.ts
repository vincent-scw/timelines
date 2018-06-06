import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Timeline } from './models/timeline.model';
import { TimelineService } from './services/timeline.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {
  timelines$: Observable<Timeline[]>;
  urlTopicKey: string;

  constructor(private timelineService: TimelineService,
    private router: Router,
    private location: Location) {

  }

  ngOnInit() {
    this.timelines$ = this.timelineService.getTimelines();
    this.urlTopicKey = location.pathname;
  }

  onTimelineClicked(timeline: Timeline) {
    this.router.navigateByUrl(`/${timeline.topicKey}`);
    this.urlTopicKey = timeline.topicKey;
  }
}