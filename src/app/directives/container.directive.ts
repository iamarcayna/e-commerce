import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[viewContainer]",
})
export class ContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
