import { Routes } from '@angular/router';
import { HelloComponent } from './features/dashboaord/hello/hello.component';
import { AddProjectsComponent } from './features/dashboaord/projects-archtecture/projects/add-projects/add-projects.component';
import { ShowProjectsComponent } from './features/dashboaord/projects-archtecture/projects/show-projects/show-projects.component';
import { EditProjectsComponent } from './features/dashboaord/projects-archtecture/projects/edit-projects/edit-projects.component';
import { AddServiceComponent } from './features/dashboaord/our-services/add-service/add-service.component';
import { ShowServicesComponent } from './features/dashboaord/our-services/show-services/show-services.component';
import { EditServiceComponent } from './features/dashboaord/our-services/edit-service/edit-service.component';
import { AddNewComponent } from './features/dashboaord/news/add-new/add-new.component';
import { ShowNewsComponent } from './features/dashboaord/news/show-news/show-news.component';
import { EditNewComponent } from './features/dashboaord/news/edit-new/edit-new.component';
import { DashComponent } from './features/dashboaord/dash/dash.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/gurades/auth.guard';
import { ProjectdetilsComponent } from './features/dashboaord/projects-archtecture/projects/projectdetils/projectdetils.component';
import { ShowRequestComponent } from './features/dashboaord/request/show-request/show-request.component';
import { RequesDetilsComponent } from './features/dashboaord/request/reques-detils/reques-detils.component';


export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    {
        path: "dashboard", component: DashComponent, canActivate: [authGuard], children: [
            { path: '', redirectTo: "hello", pathMatch: "full" },
            { path: 'hello', component: HelloComponent },
            { path: 'add_project', component: AddProjectsComponent },
            { path: 'show_projects', component: ShowProjectsComponent },
            { path: 'edit_project/:id', component: EditProjectsComponent },
            { path: 'project_detils/:id', component: ProjectdetilsComponent },
            { path: 'add_service', component: AddServiceComponent },
            { path: 'show_services', component: ShowServicesComponent },
            { path: 'edit_service/:id', component: EditServiceComponent },

            { path: 'add_new', component: AddNewComponent },
            { path: 'show_news', component: ShowNewsComponent },
            { path: 'edit_new/:id', component: EditNewComponent },

            { path: 'requst', component: ShowRequestComponent },
            { path: 'request/:id', component: RequesDetilsComponent },


        ]
    },

];
