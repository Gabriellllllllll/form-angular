import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  
  form!: FormGroup;

  index = 0;

  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService,
    private router: Router, private routerUser: ActivatedRoute) {}

  ngOnInit(): void {
    this.routerUser.paramMap.subscribe((params) => {
      this.index = params.get('index') as any;
      const usuario = this._usuarioService.getSingleUsuario(this.index);
      this.form = this.fb.group({
        cpf: [usuario.cpf, Validators.required],
        nome: [usuario.nome, Validators.required],
        sobrenome: [usuario.sobrenome, Validators.required],
        email: [usuario.email, Validators.required],
        empresa: [usuario.empresa],
        setor: [usuario.setor],
        cargo: [usuario.cargo]
      })
    });
  }

  adicionarUsuario() {

    const user: Usuario = {
      cpf: this.form.value.cpf,
      nome: this.form.value.nome,
      sobrenome: this.form.value.sobrenome,
      email: this.form.value.email,
      empresa: this.form.value.empresa,
      setor: this.form.value.setor,
      cargo: this.form.value.cargo
    }

    this._usuarioService.editarUsuario(user, this.index);
    this.router.navigate(['/dashboard/usuarios']);
  }

}
