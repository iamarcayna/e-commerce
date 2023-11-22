import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-drawer",
  templateUrl: "./drawer.component.html",
})
export class DrawerComponent {
  @Input("open") drawerOpen!: boolean;
  @Output() close = new EventEmitter<any>();

  closeDrawer() {
    this.close.emit();
  }
}
