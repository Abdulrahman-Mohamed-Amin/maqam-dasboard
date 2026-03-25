import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../../core/services/projects/projects.service';
import { AlertsService } from '../../../../../core/services/alerts/alerts.service';
import { Project } from '../../../../../core/interfaces/project/project';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projectdetils',
  standalone: true,
  imports: [ RouterModule , CommonModule],

  templateUrl: './projectdetils.component.html',
  styleUrl: './projectdetils.component.css'
})
export class ProjectdetilsComponent implements OnInit{
  url = environment.mediaUrl
project:Project | null = null
currentId:number = 0
  constructor(private _project:ProjectsService , private alert:AlertsService  , private _activeRoute:ActivatedRoute , private route:Router){}

  ngOnInit(): void {
    this.currentId =  this._activeRoute.snapshot.params['id']
    this.getProject()
  }


  getProject(){

    this._project.getById(this.currentId).subscribe(res => {
      this.project = res

      console.log(res);
      
    })
  }

  async deleteProject(){
    const confirm =await this.alert.deleteConfirm({
      title:'هل أنت متأكد من حذف المشروع',
      text:"سيتم مسح البيانات نهائيا",
    })

    if(!confirm){
      return
    }

    this._project.delete(this.currentId).subscribe({
      next:(res) =>{
        this.alert.success()
      },
      complete:() =>{
        setTimeout(() => {
          this.route.navigateByUrl('/dashboard/show_projects')
        }, 1000);
      }
    })
  }

}
