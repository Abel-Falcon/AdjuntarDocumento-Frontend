export class Consolidado {
  id: number;
  name: string;
  url: string;
  type: string;
  size: number;
  detallePPPId?: number; // Campo opcional para asociar un Detalle_PPP
  uploadProgress: number; // Agrega esta propiedad para el progreso de carga

  constructor(
    id: number,
    name: string,
    url: string,
    type: string,
    size: number,
    uploadProgress: number = 0, // Inicializamos el progreso en 0
    detallePPPId?: number
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.type = type;
    this.size = size;
    this.uploadProgress = uploadProgress;
    this.detallePPPId = detallePPPId;
  }
}
