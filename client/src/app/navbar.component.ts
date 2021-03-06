import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MomentEditorComponent } from './timeline/moment-editor/moment-editor.component';
import { Observable, Subscription } from 'rxjs';
import { Timeline, PeriodGroupLevel } from './models/timeline.model';
import { TimelineService } from './services/timeline.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RecordEditorComponent } from './record/record-editor/record-editor.component';
import { TimelineEditorComponent } from './timeline/timeline-editor/timeline-editor.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit, OnDestroy {
  timelines$: Observable<Timeline[]>;
  editable: boolean;
  activeTopicKey: string;
  burgerActive: boolean;
  years: number[] = new Array<number>();

  private timelineSub: Subscription;
  private editableSub: Subscription;

  constructor(private timelineService: TimelineService,
    private authSvc: AuthService,
    private dialog: MatDialog) {

    this.getYears();
  }

  ngOnInit() {
    this.refresh();
    this.timelineSub = this.timelineService.activeTimeline$.subscribe(t => this.activeTopicKey = t.topicKey);
    this.editableSub = this.authSvc.isLoggedIn$.subscribe(l => this.editable = l);
  }

  ngOnDestroy() {
    if (!!this.timelineSub) { this.timelineSub.unsubscribe(); }
    if (!!this.editableSub) { this.editableSub.unsubscribe(); }
  }

  async onAddNewRecordClicked() {
    const dialogRef = this.dialog.open(RecordEditorComponent);
    await dialogRef.afterClosed().toPromise();
  }

  getYears() {
    const today = new Date();
    for (let i = 2017; i <= today.getFullYear(); i++) {
      this.years.push(i);
    }
  }

  refresh() {
    this.timelines$ = this.timelineService.getTimelines();
  }

  createNew() {
    this.dialog.open(TimelineEditorComponent, { data: { periodGroupLevel: PeriodGroupLevel.byDay } })
      .afterClosed().toPromise().then(() => this.refresh());
  }

  signin() {
    AuthService.getProvider('linkedin', this.authSvc).signIn();
  }

  signout() {
    this.authSvc.logout();
  }
}
