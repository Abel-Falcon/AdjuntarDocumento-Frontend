import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallePPP } from '../models/detalle-ppp.model.js';

@Injectable({
  providedIn: 'root',
})
export class DetallePPPService {
  private baseUrl = 'http://localhost:8080/api/detalleppp'; // Asegúrate de que esta URL sea correcta y esté en el backend

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de todos los Detalle_PPP
  getDetallesPPP(): Observable<DetallePPP[]> {
    return this.http.get<DetallePPP[]>(`${this.baseUrl}`);
  }
}
