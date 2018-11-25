// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';
import { AlbumsComponent } from './albums/albums.component';
import { NavbarComponent } from './navbar/navbar.component';

// Providers 
import { ImageService } from './images/shared/image.service';
import { AlbumsService } from './albums/shared/albums.service';

const routes: Routes = [
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'images', component: ImagesComponent },
  { path: 'images/:id/:album', component: ImagesComponent },
  { path: 'albums', component: AlbumsComponent },
  {path: '**', redirectTo: '/albums'}
];

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    NavbarComponent,
    AlbumsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ImageService,
    AlbumsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
