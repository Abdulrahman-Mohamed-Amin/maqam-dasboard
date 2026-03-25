import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import { OurServiceService } from '../../../../core/services/our-services/our-service.service';
import { Service } from '../../../../core/interfaces/service/service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule , RouterModule],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent {
  url = environment.mediaUrl
  currntService!: Service
  currentId: number = 0

  englishPattern = /^[A-Za-z0-9\s"',._-]+$/;
  arabicPattern = /^[\u0600-\u06FF0-9\u0660-\u0669\s"',.،_-]+$/;
  submitted = false;

  imgsToDelet: string[] = []
  selcetImg = false

  videoFile: File | null = null;
  imageFiles: File[] = [];

  editForm: FormGroup = new FormGroup({
    arTitle: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    enTitle: new FormControl(''),
    arDescription: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    enDescription: new FormControl(''),
    imageFile: new FormControl([]),
  });

  constructor(private alert: AlertsService, private _service: OurServiceService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getService()
    this.currentId = +this.activeRoute.snapshot.params['id']

  }

  getService() {
    let serviceID = +this.activeRoute.snapshot.params['id']
    this._service.getService().subscribe(res => {
      console.log(res);
      
      const service = res.find(serv => serv.id === serviceID);
      if (!service) {
        return;
      }

      this.currntService = service;

      this.editForm.patchValue({
        arTitle: this.currntService.arTitle,
        enTitle: this.currntService.enTitle,
        arDescription: this.currntService.arDescription,
        enDescription: this.currntService.enDescription,
      })
    })
  }

  submit() {

    this.submitted = true;

    this.edit()
  }

  edit() {
    const formData = new FormData()

    formData.append('arTitle', this.editForm.value.arTitle)
    formData.append('arDescription', this.editForm.value.arDescription)
    formData.append('enTitle', this.editForm.value.enTitle)
    formData.append('enDescription', this.editForm.value.enDescription)




    if (this.imageFiles && this.imageFiles.length > 0) {
      this.imageFiles.forEach((img) => {
        formData.append('imageFile', img);
     
        
      });
    }


    if (this.editForm.valid) {
      this._service.editService(formData, this.currentId).subscribe({
        next: (res) => {
          this.alert.toaster("تمت تعديل الخدمة بنجاح", 'success')
        },
        error: () => {
          this.alert.toaster('حدث خطأ أثناء التعديل', "error");
        }
      })
    } else {
      if(this.editForm.get('imageFiles')?.invalid){
        this.alert.toaster('اذا كنت ستمسح صورة يجب اضافة اخري', "error")

      }else{

        this.alert.toaster('بعض الحقول فارغة', "error")
      }

    }

  }

  // =================== ازالة الصورة ===============




  onImagesSelected(event: any) {
    const files = event.target.files as FileList;
    this.imageFiles = [];

    for (let i = 0; i < files.length; i++) {
      this.imageFiles.push(files[i]);
    }
  }



}