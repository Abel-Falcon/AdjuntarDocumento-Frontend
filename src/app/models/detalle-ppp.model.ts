// src/app/models/detalle-ppp.model.ts
import { Consolidado } from './consolidado';

export class DetallePPP {
  id: number;
  consolidados?: Consolidado[]; // Opcional: solo si necesitas ver los consolidados asociados

  constructor(id: number, consolidados?: Consolidado[]) {
    this.id = id;
    this.consolidados = consolidados;
  }
}
