import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CreatorComponent } from './creator/creator.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements AfterViewInit{
  @ViewChild('creatorRef', { read: CreatorComponent }) childComponent!: CreatorComponent;

  ngAfterViewInit(): void {
    this.childComponent.init();
  }

}
