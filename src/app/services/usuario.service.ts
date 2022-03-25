import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  getUsuario(): Usuario[] {
    const data = localStorage.getItem('id');

    if(data){
      return JSON.parse(data);
    }

    return [];
  }

  getSingleUsuario(index: number): Usuario {
    return this.getUsuario()[index];
  }

  apagarUsuario(index: number): void {
    const usuarios = this.getUsuario();
    usuarios.splice(index, 1);

    localStorage.setItem('id', JSON.stringify(usuarios));
  }

  adicionarUsuario(usuario: Usuario): void {
    const usuarios = this.getUsuario();
    usuarios.unshift(usuario);
    if(usuario.cpf )
    localStorage.setItem('id', JSON.stringify(usuarios));
  }

  editarUsuario(usuario: Usuario, index: number){
    const allUsers = this.getUsuario();
    allUsers[index] = usuario;
    localStorage.setItem('id', JSON.stringify(allUsers));
  }
}