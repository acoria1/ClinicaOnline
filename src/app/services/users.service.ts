import { Injectable } from '@angular/core';
import { User } from '../Entities/user';
import { AuthService } from './auth.service';
import { FilesService } from './files.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public fileService : FilesService, public auth : AuthService) { }

  async registerNewUser(user : User, password : string, imagenes : string[]){
    user.imagenes =  await this.uploadUserImages(user, imagenes);
    return this.auth.SignUp(user, password);
  }

  async uploadUserImages(user : User, images : string[]) : Promise<string[]>{
    let urls : string[] = [];
    try {
      for (let i = 0; i < images.length; i++){
        let img = await this.fileService.uploadFile(
              `${user.email.substring(0, user.email.lastIndexOf("@"))}_${i}`,
              images[i],
              {nombre : user.nombre});
            let url = await img.ref.getDownloadURL();
            urls.push(url);
      }
    } catch (error) {
      urls = [];
    }
    return urls;
  }
}
