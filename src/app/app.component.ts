import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BoxResponse } from './shared/components/shape-space/interfaces/shapes-interfaces';
import { BoxService } from './shared/services/boxes-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  public boxes!: BoxResponse[];
  public selectedBox!: BoxResponse;

  private unsubscribe$$ = new Subject<void>();

  constructor(private boxService: BoxService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.boxService
      .getBoxes()
      .pipe(takeUntil(this.unsubscribe$$))
      .subscribe((boxes) => {
        this.boxes = boxes;
        this.selectedBox = this.boxes[0];
      });
  }

  public selectBox(box: BoxResponse) {
    this.selectedBox = box;
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }
}
