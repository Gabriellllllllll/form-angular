import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listUsuarios: Usuario[] = [
    {cpf: '1', nome: 'Gabriel', sobrenome: 'Maciel', sexo: 'Masculino'},
    {cpf: '2', nome: 'Juan', sobrenome: 'Gomes', sexo: 'Masculino'},
    {cpf: '3', nome: 'Marta', sobrenome: 'Garcia', sexo: 'Feminino'},
    {cpf: '4', nome: 'Victor', sobrenome: 'Lima', sexo: 'Masculino'},
    {cpf: '5', nome: 'Maria', sobrenome: 'Mendes', sexo: 'Feminino'},
    {cpf: '6', nome: 'João', sobrenome: 'Souza', sexo: 'Masculino'},
  ];
  
  displayedColumns: string[] = ['cpf', 'nome', 'sobrenome', 'sexo', 'acoes'];
  dataSource = new MatTableDataSource(this.listUsuarios);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
