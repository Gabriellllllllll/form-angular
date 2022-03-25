import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { CpfValidator } from 'src/app/validators/cpf-validator';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})

export class CriarUsuarioComponent implements OnInit {
  form: FormGroup;

  cpfvalid(){
    if(!CpfValidator){
      return CpfValidator;
    }else{
      return CpfValidator;
    }
  }
  cpfFormControl = new FormControl('', [Validators.required, CpfValidator.cpfValido]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nomeFormControl = new FormControl('', [Validators.required]);
  sobrenomeFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService, private router: Router) {
    this.form = this.fb.group({
      cpf: this.cpfFormControl,
      nome: this.nomeFormControl,
      sobrenome: this.sobrenomeFormControl,
      email: this.emailFormControl,
      empresa: [''],
      setor: [''],
      cargo: ['']
    })
  }

  ngOnInit(): void {
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
    this._usuarioService.adicionarUsuario(user);
    this.router.navigate(['/dashboard/usuarios']);
  }
}