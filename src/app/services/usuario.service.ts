import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listUsuarios: Usuario[] = [];

  constructor() { }

  getUsuario(){
    if(localStorage.getItem('id')){
      const data = localStorage.getItem('id');
      this.listUsuarios = JSON.parse(data as string);
    }else{
      this.listUsuarios = [];
    }
    return this.listUsuarios;
  }

  apagarUsuario(index: number){
    this.listUsuarios.splice(index, 1);
    localStorage.setItem('id', JSON.stringify(this.listUsuarios));
  }

  adicionarUsuario(usuario: Usuario){
    this.listUsuarios.unshift(usuario);
    localStorage.setItem('id', JSON.stringify(this.listUsuarios));
  }

  editarUsuario(index: number){
    
  }
}