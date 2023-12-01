import { Injectable } from "@angular/core";
import { SnackbarComponent } from "../components/snackbar/snackbar.component";
import { ContainerDirective } from "../directives/container.directive";

interface snackbarOptions {
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  private snackbarContainer: ContainerDirective | undefined;

  showSnackbar(options?: snackbarOptions) {
    if (!this.snackbarContainer) {
      return;
    }
    const snackbarRef =
      this.snackbarContainer.viewContainerRef.createComponent<SnackbarComponent>(
        SnackbarComponent
      );
    snackbarRef.instance.message = options
      ? options.message
      : "This is a snackbar.";
    snackbarRef.instance.duration =
      options && options.duration ? options.duration : 3_000;
    snackbarRef.instance.onClose.subscribe((close) => {
      if (close) {
        snackbarRef.destroy();
      }
    });
  }

  setContainer(container: ContainerDirective) {
    this.snackbarContainer = container;
  }
}
