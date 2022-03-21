import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listUsuarios: Usuario[] = [
    {cpf: '1', nome: 'Gabriel', sobrenome: 'Maciel', sexo: 'Masculino'},
    {cpf: '2', nome: 'Juan', sobrenome: 'Gomes', sexo: 'Masculino'},
    {cpf: '3', nome: 'Marta', sobrenome: 'Garcia', sexo: 'Feminino'},
    {cpf: '4', nome: 'Victor', sobrenome: 'Lima', sexo: 'Masculino'},
    {cpf: '5', nome: 'Maria', sobrenome: 'Mendes', sexo: 'Feminino'},
    {cpf: '6', nome: 'João', sobrenome: 'Souza', sexo: 'Masculino'},
  ];

  constructor() { }

  getUsuario(){
    return this.listUsuarios.slice();
  }

  apagarUsuario(index: number){
    this.listUsuarios.splice(index, 1);
  }

  adicionarUsuario(usuario: Usuario){
    this.listUsuarios.unshift(usuario);
  }
}