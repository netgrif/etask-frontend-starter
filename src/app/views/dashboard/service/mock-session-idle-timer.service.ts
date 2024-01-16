import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class MockSessionIdleTimerService {
    remainSeconds$ = of(1);

    startTimer(): void {

    }
    stopTimer(): void {

    }
    resetTimer(): void {

    }
}