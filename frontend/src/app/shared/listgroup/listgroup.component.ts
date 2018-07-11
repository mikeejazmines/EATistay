import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listgroup',
  templateUrl: './listgroup.component.html',
  styleUrls: ['./listgroup.component.css']
})
export class ListgroupComponent implements OnInit {

  @Input() word: string;
  @Input() suffix: string;

  constructor() { }

  ngOnInit() {
  }

}
