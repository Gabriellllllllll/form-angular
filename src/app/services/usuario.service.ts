import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listUsuarios: Usuario[] = [];

  constructor() { }

  getUsuario(usuario: Usuario){
    return this.listUsuarios = localStorage.getItem(id);
  }

  apagarUsuario(index: number){
    this.listUsuarios.splice(index, 1);
  }

  adicionarUsuario(usuario: Usuario){
    this.listUsuarios.unshift(usuario);
    localStorage.setItem('id', JSON.stringify(this.listUsuarios));
  }
}