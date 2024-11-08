export class Consolidado {
  // src/app/models/response-file.model.ts
  id: number;
  name: string;
  url: string;
  type: string;
  size: number;

  constructor(
    id: number,
    name: string,
    url: string,
    type: string,
    size: number
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.type = type;
    this.size = size;
  }
}
