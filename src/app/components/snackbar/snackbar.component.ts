import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from "@angular/core";
import { Subscription, timer } from "rxjs";

@Component({
  selector: "app-snackbar",
  templateUrl: "./snackbar.component.html",
})
export class SnackbarComponent implements AfterViewInit {
  @Input("message") message: string = "This is a snackbar.";
  @Input("duration") duration: number = 3_000;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter(false);
  interval: number = 10;
  loadingPercentage: number = 0;
  timerSubscription!: Subscription;

  ngAfterViewInit(): void {
    this.timeoutLoader();
  }

  close() {
    this.onClose.emit(true);
  }

  timeoutLoader() {
    let timerCount = 0;
    this.timerSubscription = timer(0, this.interval).subscribe(() => {
      timerCount = timerCount + this.interval;
      this.loadingPercentage = Math.floor((timerCount / this.duration) * 100);
      if (this.loadingPercentage === 100) {
        this.timerSubscription?.unsubscribe();
        setTimeout(() => {
          this.onClose.emit(true);
        }, 200);
      }
    });
  }
}
