export interface ProjectImage {
  id: number;
  imagePath: string;
  projectId: number;
}

export interface Project {
  id: number;
  arTitle: string;
  arDescription: string;
  enTitle: string;
  enDescription: string;
  clientName: string;
  value: string;
  fromDate: string;
  toDate: string;
  imageFiles: string[];
  projectImages: ProjectImage[];
  interfaceImageFile: string;
  interfaceImagePath: string;
  projectCategory: number;
  arProjectCategory:string ;
  enProjectCategory:string ;
}