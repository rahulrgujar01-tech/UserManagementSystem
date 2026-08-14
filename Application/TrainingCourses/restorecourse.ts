import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TrainingCourseRepositorySimple } from '../../Infrastructure/Repositories/Trainingcourserepositoriesimpl';

@Injectable({
  providedIn: 'root'
})
export class RestoreCourse {

  constructor(
    private trainingCourseRepository: TrainingCourseRepositorySimple
  ) {}

  execute(id: number): Observable<void> {

    return this.trainingCourseRepository.restoreTrainingCourse(id);
  }
}