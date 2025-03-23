import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HomeComponent } from './home/home.component';
import { DonationsComponent } from './donations/donations.component';
import { YoungAdultsMinistryComponent } from './young-adults-ministry/young-adults-ministry.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: 'contact', component: ContactComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'home', component: HomeComponent},
  {path: 'donate', component: DonationsComponent},
  {
    path: 'young-adults-ministry',
    component: YoungAdultsMinistryComponent,
    canActivate: [AuthGuard]
  },
  {path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
