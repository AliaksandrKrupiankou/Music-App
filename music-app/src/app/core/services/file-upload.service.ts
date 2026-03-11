import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  http = inject(HttpClient);

  private readonly API_KEY = '12d815e248875ccfa68f7bbd96e1c95f';

  upload(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http
      .post<any>(`https://api.imgbb.com/1/upload?key=${this.API_KEY}`, formData)
      .pipe(map((res) => res.data.url as string));
  }
}
