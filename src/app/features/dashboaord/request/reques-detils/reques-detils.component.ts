import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RequstService } from '../../../../core/services/requst/requst.service';
import { ActivatedRoute } from '@angular/router';
import { Req } from '../../../../core/interfaces/req';

@Component({
  selector: 'app-reques-detils',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reques-detils.component.html',
  styleUrl: './reques-detils.component.css'
})
export class RequesDetilsComponent implements OnInit{
request = {
  id: 1,
  fullName: 'محمد علي',
  phone: '0501234567',
  email: 'mohamed@gmail.com',
  services: ['التشطيبات', 'الترميم'],
  requestType: 'زيارة',
  date: new Date('2026-04-04T15:00'),
  notes: 'يرجى الاتصال قبل الزيارة'
};
currentid:number = 0

req:Req[] = []
constructor(private _req:RequstService , private _route:ActivatedRoute){}

ngOnInit(): void {
  this.currentid = this._route.snapshot.params['id']

  this.getreq()
}

getreq(){
  this._req.getRequest().subscribe(res =>{
    this.req = res.filter(r => r.id == this.currentid) 

    console.log(this.req);
    
  })
}

isUpcoming(date: any) {
  const now = new Date();
  const target = new Date(date);
  const diffHours = (target.getTime() - now.getTime()) / (1000*60*60);
  return diffHours >= 0 && diffHours < 24;
}

isPast(date: any) {
  const now = new Date();
  const target = new Date(date);
  return target.getTime() < now.getTime();
}

getDateClass(date: any) {
  if(this.isPast(date)) return 'date past';
  if(this.isUpcoming(date)) return 'date upcoming';
  return 'date far';
}



deleteRequest(id: number) {
  if(confirm('هل أنت متأكد من الحذف؟')) {
    console.log('تم حذف الطلب', id);
  }
}
}
