import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequstService } from '../../../../core/services/requst/requst.service';
import { Req } from '../../../../core/interfaces/req';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-show-request',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './show-request.component.html',
  styleUrl: './show-request.component.css'
})
export class ShowRequestComponent implements OnInit{

  requstes: Req[] = []


  constructor(private _req: RequstService) { }

  ngOnInit() {
    this.getreq()
  }

  getreq() {
    this._req.getRequest().subscribe(res => {
      this.requstes = res
      console.log(res);
      
    })
  }

  isUpcoming(date: any) {
    const now = new Date();
    const target = new Date(date);
    const diffHours = (target.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours >= 0 && diffHours < 24;
  }

  isPast(date: any) {
    const now = new Date();
    const target = new Date(date);
    return target.getTime() < now.getTime();
  }

  getDateClass(date: any) {
    if (this.isPast(date)) return 'date past';
    if (this.isUpcoming(date)) return 'date upcoming';
    return 'date far';
  }


}
