import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertsService } from '../../../../core/services/alerts/alerts.service';
import { NewsService } from '../../../../core/services/news/news.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-new',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.css'
})
export class AddNewComponent {
  englishPattern = /^[A-Za-z0-9\s"',._-]+$/;
  arabicPattern = /^[\u0600-\u06FF0-9\u0660-\u0669\s"',.،_-]+$/;
  submitted = false;


  addVideo: boolean = false
  addImg: boolean = true
  imageFiles: File[] = [];
  videoFile: File | null = null;

  addForm: FormGroup = new FormGroup({
    arTitle: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    enTitle: new FormControl(''),
    arDescription: new FormControl('', [Validators.required, Validators.pattern(this.arabicPattern)]),
    enDescription: new FormControl(''),
    imageFile: new FormControl([]),
    VedioFile: new FormControl(null),
    date: new FormControl('', Validators.required)

  });

  constructor(private alert: AlertsService, private _news: NewsService) { }

  ngOnInit(): void {
    this.getService()
  }
  getService() {

  }

  submit() {

    this.submitted = true;

    if (this.addForm.invalid) {
      this.alert.toaster('بعض الحقول فارغة او هناك خطأ في الادخال', "error")
      console.log(this.addForm.errors);
      
      return;
    }

    // 👇 تحقق من الوسائط


    this.add()
  }

  add() {
    const formData = new FormData()

    formData.append('arTitle', this.addForm.value.arTitle)
    formData.append('arDescription', this.addForm.value.arDescription)
    formData.append('enTitle', this.addForm.value.enTitle)
    formData.append('enDescription', this.addForm.value.enDescription)
    formData.append('date', this.addForm.value.date)


    if (this.imageFiles && this.imageFiles.length > 0) {
      this.imageFiles.forEach((img) => {
        formData.append('imageFile', img);
      });
    }

    if (this.videoFile instanceof File) {
      formData.append('VedioFile', this.videoFile);
    }

    if (this.addForm.valid) {
      this._news.addNew(formData).subscribe({
        next: (res) => {
          this.addForm.reset()
          this.alert.toaster("تمت اضافة الخدمة بنجاح", 'success')
          this.submitted = false
          console.log(res);

        },
        error: () => {
          this.alert.toaster('حدث خطأ أثناء التحديث', "error");
        },
      })
    } else {
      this.alert.toaster('بعض الحقول فارغة', "error")
    }

  }



  // ====================== اضافة الصور والفيديوهات


  onImagesSelected(event: any) {
    const files = event.target.files as FileList;
    this.imageFiles = [];

    for (let i = 0; i < files.length; i++) {
      this.imageFiles.push(files[i]);
    }

    console.log(this.imageFiles);
    
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    this.videoFile = file || null;
  }

 toggleToaddImg() {
  this.addImg = true;
  this.addVideo = false;
  this.imageFiles = [];

}

toggleToaddVideo() {
  this.addImg = false;
  this.addVideo = true;
  this.imageFiles = [];

}
}
