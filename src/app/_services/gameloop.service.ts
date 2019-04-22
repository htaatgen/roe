import { Injectable } from '@angular/core';
import {animationFrameScheduler, Observable, of } from "rxjs";
import { tap, repeat} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameloopService {
    renderLoop: Observable<number>;
    logicLoop: Observable<number>;

  constructor() { }

  public startLoop(){
    this.renderLoop = of(0, animationFrameScheduler)
        .pipe(repeat());

    this.logicLoop = new Observable((observer)=>{
      setInterval(()=>{
        observer.next(window.performance.now())
      },250)
    })
  }
}
