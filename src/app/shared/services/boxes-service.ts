/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BoxResponse } from '../components/shape-space/interfaces/shapes-interfaces';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private boxes: BoxResponse[] = [
    {
      id: 0,
      itemDescription: 'One',
      color: 0x9d0707,
      x: 1,
      y: 1,
      z: 1,
    },
    {
      id: 1,
      itemDescription: 'Two',
      color: 0x07499d,
      x: 2,
      y: 1,
      z: 4,
    },
    {
      id: 3,
      itemDescription: 'Three',
      color: 0xa20bb4,
      x: 1,
      y: 3,
      z: 5,
    },
  ];
  constructor() {}

  /**
   * Get all boxes
   */
  getBoxes(): Observable<BoxResponse[]> {
    return of(this.boxes).pipe(
      catchError((error) => {
        console.error(error, 'Error fetching boxes');
        return of([]);
      })
    );
  }

  /**
   * Delete the box by Id
   * @param boxId Box Id to delete
   * @return OK
   */
  deleteBoxes(boxId: number): Observable<BoxResponse | null> {
    let __params = new HttpParams();
    __params.append('boxId', boxId);

    return of(this.boxes.find((box) => (box.id = boxId)) as BoxResponse).pipe(
      catchError((error) => {
        console.error(error, 'Error deleteing the box ');
        return of(null);
      })
    );
  }
}
