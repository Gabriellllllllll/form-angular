import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {
  sexo: any = ['Masculino', 'Feminino']
  form: FormGroup;

  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService,
              private router: Router) { 
    this.form = this.fb.group({
      cpf: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      sexo: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  adicionarUsuario(){
    
    const user: Usuario = {
      cpf: this.form.value.cpf,
      nome: this.form.value.nome,
      sobrenome: this.form.value.sobrenome,
      sexo: this.form.value.sexo,
    }

    this._usuarioService.adicionarUsuario(user);
    this.router.navigate(['/dashboard/usuarios']);
  }
}
