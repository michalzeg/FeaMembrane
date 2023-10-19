import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly inputChangedSub = new Subject<void>();

  public inputChanged$ = this.inputChangedSub.asObservable();

  public notifyInputChanged() {
    this.inputChangedSub.next();
  }
}
