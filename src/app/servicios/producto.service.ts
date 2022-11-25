import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloProducto } from '../modelos/producto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
url = 'http://localhost:3000';
token: String = '';
  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }


ObtenerRegistros(): Observable<ModeloProducto[]>{
  return this.http.get<ModeloProducto[]>('S{this.url}/productos');
}

ObtenerRegistroPorId(id: string): Observable<ModeloProducto>{
  return this.http.get<ModeloProducto>('S{this.url}/productos/S{id}');
}

CrearProducto(producto: ModeloProducto): Observable<ModeloProducto>{
  return this.http.post<ModeloProducto>('S{this.url}/productos', producto,{
    headers: new HttpHeaders({
      'Authorization': `Bearer S{this.token}`
    })
  })
}

ActualizarProducto(producto: ModeloProducto): Observable<ModeloProducto>{
  return this.http.put<ModeloProducto>('S{this.url}/productos', producto,{
    headers: new HttpHeaders({
      'Authorization': `Bearer S{this.token}`
    })
  })
}

EliminarProducto(id: string): Observable<any>{
  return this.http.delete('S{this.url}/productos/S{id}', {
    headers: new HttpHeaders({
      'Authorization': `Bearer S{this.token}`
    })
  })
}

}
