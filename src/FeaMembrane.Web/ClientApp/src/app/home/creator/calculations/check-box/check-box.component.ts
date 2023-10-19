import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent {

  @Input()
  title = '';
  @Input()
  checkedIcon = 'pi pi-check';
  @Input()
  uncheckedIcon = 'pi'

  @Output()
  clicked = new EventEmitter<boolean>()

  @Input()
  checked = false;

  click(){
    this.checked = !this.checked;
    this.clicked.emit(this.checked);
  }

}
