import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-drive-item',
  templateUrl: './drive-item.component.html',
  styleUrls: ['./drive-item.component.scss'],
})
export class DriveItemComponent implements OnInit {
  @Input() item: any;
  @Input() isArchive: boolean;

  constructor() { }

  ngOnInit() {}

}
