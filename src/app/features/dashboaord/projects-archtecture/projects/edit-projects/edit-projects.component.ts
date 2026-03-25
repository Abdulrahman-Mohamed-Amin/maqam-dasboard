import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ProjectsService } from '../../../../../core/services/projects/projects.service';
import { AlertsService } from '../../../../../core/services/alerts/alerts.service';
import { environment } from '../../../../../../environments/environment';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-edit-projects',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './edit-projects.component.html',
  styleUrl: './edit-projects.component.css'
})
export class EditProjectsComponent implements OnInit {
  submitted = false;

  project: any | null = null;
  curuentId: number = 0

  imgUrl = environment.mediaUrl

  englishPattern = /^[A-Za-z0-9\s"',._()\-\[\]]+$/;
  arabicPattern = /^[\u0600-\u06FF0-9\u0660-\u0669\s"',.،_()\-\[\]]+$/;

  imageFiles: File[] = [];
  interfaceImageFile: File | null = null;


  uploadedFiles: any[] = [];
  imgs: any[] = []


  imgsTodelet: string[] = []
  selectIMg = false

  interFcaeImgDelete: string = ''

  editForm: FormGroup = new FormGroup({
    arTitle: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    enTitle: new FormControl(''),
    arDescription: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    enDescription: new FormControl(''),
    clientName: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    value: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    fromDate: new FormControl(null, [Validators.required,]),
    toDate: new FormControl(null, [Validators.required,]),
    imageFiles: new FormControl([]),
    interfaceImageFile: new FormControl(null),
    projectCategory: new FormControl(null),
    ImagesToDelete: new FormControl(null),

  });

  constructor(private _project: ProjectsService, private alert: AlertsService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.curuentId = +this._route.snapshot.params['id']
    this.getProject()
  }

  getProject() {
    this._project.getById(this.curuentId).subscribe(res => {
      this.project = res

      this.editForm.patchValue({
        arTitle: this.project.arTitle,
        enTitle: this.project.enTitle,
        arDescription: this.project.arDescription,
        enDescription: this.project.enDescription,
        clientName: this.project.clientName,
        value: this.project.value,
        fromDate: this.project.fromDate,
        toDate: this.project.toDate,
        projectCategory: this.project.arProjectCategory.includes('عماره') ? 1 : 2
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
    formData.append('enTitle', this.editForm.value.enTitle)
    formData.append('arDescription', this.editForm.value.arDescription)
    formData.append('enDescription', this.editForm.value.enDescription)
    formData.append('clientName', this.editForm.value.clientName)
    formData.append('value', this.editForm.value.value)
    formData.append('fromDate', this.editForm.value.fromDate)
    formData.append('toDate', this.editForm.value.toDate)
    formData.append('projectCategory', this.editForm.value.projectCategory)
    

    if (this.interfaceImageFile instanceof File) {
      formData.append('interfaceImageFile', this.interfaceImageFile);

    }

    if (this.imageFiles && this.imageFiles.length > 0) {
      this.imageFiles.forEach((img) => {
        formData.append('imageFiles', img);
      });
    }
    if (this.imgsTodelet.length > 0) {
      this.imgsTodelet.forEach((img) => {
        formData.append('ImagesToDelete', img);
      });
    }

    if (this.editForm.valid) {
      this._project.edit(this.curuentId, formData).subscribe({
        next: (res) => {

          this.alert.toaster("تم تعديل المشروع بنجاح", 'success')

          this.interfaceImageFile = null;
  
          this.imageFiles = [];
          this.submitted = false

        },
        error: () => {
          this.alert.toaster('حدث خطأ أثناء التحديث', "error");
        },
        complete: () => {
          setTimeout(() => {
            location.reload()
          }, 1000);
        }
      })
    } else {
      this.alert.toaster('بعض الحقول فارغة او هناك خطا ما', "error")
    }

  }


  deletImgs(url: string) {

    let check = this.imgsTodelet.indexOf(url)

    if (check == -1) {

      this.imgsTodelet.push(url)
    } else {
      this.imgsTodelet.splice(check, 1)
    }



  }

  deleteInterFaceImg() {

    if (this.interFcaeImgDelete == '') {
      this.interFcaeImgDelete = this.project!.videoPath!
      this.selectIMg = true
    } else {
      this.interFcaeImgDelete = ''
      this.selectIMg = false

    }

    console.log(this.interFcaeImgDelete);

  }







  onImagesSelected(event: any) {
    const files = event.target.files as FileList;
    this.imageFiles = [];

    for (let i = 0; i < files.length; i++) {
      this.imageFiles.push(files[i]);
    }
  }

  onInterfaceImageChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.interfaceImageFile = input.files?.[0] ?? null;
  }



}
