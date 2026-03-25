import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { ProjectsService } from '../../../../../core/services/projects/projects.service';
import { AlertsService } from '../../../../../core/services/alerts/alerts.service';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-add-projects',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, RouterLink],
  providers: [],
  templateUrl: './add-projects.component.html',
  styleUrl: './add-projects.component.css'
})
export class AddProjectsComponent implements OnInit {
  submitted = false;

  englishPattern = /^[A-Za-z0-9\s"',._()\-\[\]]+$/;
  arabicPattern = /^[\u0600-\u06FF0-9\u0660-\u0669\s"',.،_()\-\[\]]+$/;

  imageFiles: File[] = [];
  interfaceImageFile: File | null = null;

  imgs: any[] = []


  addForm: FormGroup = new FormGroup({
    arTitle: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    enTitle: new FormControl('description'),
    arDescription: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    enDescription: new FormControl('description'),
    clientName: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    value: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    fromDate: new FormControl(null, [Validators.required,]),
    toDate: new FormControl(null, [Validators.required,]),
    imageFiles: new FormControl([]),
    interfaceImageFile: new FormControl(null),
    projectCategory: new FormControl('' , Validators.required),
  }

  );

  constructor(private _projects: ProjectsService, private alert: AlertsService) { }

  ngOnInit(): void {
    
  }

  add() {
    const formData = new FormData()

    formData.append('arTitle', this.addForm.value.arTitle)
    formData.append('enTitle', this.addForm.value.enTitle)
    formData.append('arDescription', this.addForm.value.arDescription)
    formData.append('enDescription', this.addForm.value.enDescription)
    formData.append('clientName', this.addForm.value.clientName)
    formData.append('value', this.addForm.value.value)
    formData.append('fromDate', this.addForm.value.fromDate)
    formData.append('toDate', this.addForm.value.toDate)
    formData.append('projectCategory', this.addForm.value.projectCategory)

    if (this.interfaceImageFile instanceof File) {
      formData.append('interfaceImageFile', this.interfaceImageFile);
    }


    if (this.imageFiles && this.imageFiles.length > 0) {
      this.imageFiles.forEach((img) => {
        formData.append('imageFiles', img);
      });
    }

    if (this.addForm.valid) {
      this._projects.add(formData).subscribe({
        next: (res) => {

          this.alert.toaster("تمت اضافة المشروع بنجاح", 'success')

          this.interfaceImageFile = null;
          this.imageFiles = [];

        },
        error: () => {
          this.alert.toaster('حدث خطأ أثناء التحديث', "error");
        },
        complete:() => {
          this.submitted = false
          this.addForm.reset()

        }
      })
    } else {
      this.alert.toaster('بعض الحقول فارغة', "error")
    }

  }



  submit() {

    this.submitted = true;
    if (this.addForm.invalid) {
      this.alert.toaster('بعض الحقول فارغة', "error")
      return;
    }
    this.add()
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

    console.log('interfaceImageFile:', this.interfaceImageFile);
  }




}
