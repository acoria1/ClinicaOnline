import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private storage: AngularFireStorage) { 

  }

  public uploadFile(fileName: string, data: any,metadata:any) {
    return this.storage.upload(fileName, data, {customMetadata:metadata });
  }

  public getFileRef(fileName: string) {
    return this.storage.ref(fileName).getDownloadURL();
  }
  
}
