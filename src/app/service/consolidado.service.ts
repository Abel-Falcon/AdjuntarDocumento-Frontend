// src/app/services/consolidado.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consolidado } from '../models/consolidado';

@Injectable({
  providedIn: 'root',
})
export class ConsolidadoService {
  private baseUrl = 'http://localhost:8080/api/fileManager';

  constructor(private http: HttpClient) {}

  // Método para listar todos los archivos
  getFiles(): Observable<Consolidado[]> {
    return this.http
      .get<Consolidado[]>(`${this.baseUrl}/files`)
      .pipe(
        map((data: any[]) =>
          data.map(
            (file) =>
              new Consolidado(
                file.id,
                file.name,
                file.url,
                file.type,
                file.size
              )
          )
        )
      );
  }

  // Método para obtener un archivo específico por ID y descargarlo
  getFile(id: number): Observable<Blob> {
    const url = `${this.baseUrl}/files/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  // Método para obtener un archivo específico por ID para visualizarlo
  getFileForPreview(id: number): Observable<Blob> {
    const url = `${this.baseUrl}/files/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  // Método para subir uno o más archivos
  uploadFiles(files: File[]): Observable<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file, file.name));
    return this.http
      .post<any>(`${this.baseUrl}/upload`, formData)
      .pipe(map((responses: any[]) => responses.map((res) => res.message)));
  }

  // Método para eliminar un archivo específico por ID
  deleteFile(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/files/${id}`, {
      responseType: 'text',
    });
  }
}
