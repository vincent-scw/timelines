import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SidebarComponent } from './sidebar.component';
import { TimelineAccessGuard } from './services/timeline-access-guard.service';
import { TimelineEditorComponent } from './timeline/timeline-editor.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'timeline/create', component: TimelineEditorComponent, canActivate: [AuthGuard] },
  { path: 'timeline/manage/:timeline', component: TimelineEditorComponent, canActivate: [AuthGuard] },
  { path: 'timeline/:timeline', component: TimelineComponent, canActivate: [TimelineAccessGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }