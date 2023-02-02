import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsPageComponent } from './pages/students-page/students-page.component';

import { StudentsRoutingModule } from './students-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { StudentModalComponent } from './components/student-modal/student-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './store/students.effects';
import { StoreModule } from '@ngrx/store';
import { StudentFeatureKey, reducer } from './store/students.reducer';

@NgModule({
  declarations: [StudentsPageComponent, StudentModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    SharedModule,
    MatTableModule,
    StoreModule.forFeature(StudentFeatureKey, reducer),
    EffectsModule.forFeature([StudentsEffects]),
  ],
})
export class StudentsModule {}
