import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CpfValidator } from 'src/app/validators/cpf-validator';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  
  form!: FormGroup;

  index = 0;
  public cpfFormControl!: FormControl;
  public emailFormControl!: FormControl
  public nomeFormControl!: FormControl
  public sobrenomeFormControl!: FormControl
  public matcher = new MyErrorStateMatcher();
  
  cpfvalid(){
    if(!CpfValidator){
      return CpfValidator;
    }else{
      return CpfValidator;
    }
  }
  
  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService,
              private router: Router, private routerUser: ActivatedRoute) { }
                
  ngOnInit(): void {
    this.routerUser.paramMap.subscribe((params) => {
      this.index = params.get('index') as any;
      const usuario = this._usuarioService.getSingleUsuario(this.index);
      this.cpfFormControl = new FormControl(usuario.cpf, [Validators.required, CpfValidator.cpfValido]);
      this.emailFormControl = new FormControl(usuario.email, [Validators.required, Validators.email]);
      this.nomeFormControl = new FormControl(usuario.nome, [Validators.required]);
      this.sobrenomeFormControl = new FormControl(usuario.sobrenome, [Validators.required]);
      
      this.form = this.fb.group({
        cpf: this.cpfFormControl,
        nome: this.nomeFormControl,
        sobrenome: this.sobrenomeFormControl,
        email: this.emailFormControl,
        empresa: [usuario.empresa],
        setor: [usuario.setor],
        cargo: [usuario.cargo]
      }),

      this.cpfFormControl.valueChanges.subscribe((value: any) => {
        if(this.cpfFormControl.valid){
          const usuarios = this._usuarioService.getUsuario()
          const isUsuario = usuarios.find((f) => f.cpf === value)
          if(isUsuario){
            this.cpfFormControl.setErrors({
              cpf_cadastrado: "Cpf ja cadastrado!"
            })
          }
        }
        console.log(value);
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
