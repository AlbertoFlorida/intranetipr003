import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})

export class BannerComponent {

public size: string = "150px"
  onMouseOver() {
    this.size = "200px"
  }
  onMouseOut(){
    this.size = "150px"
  }
}
