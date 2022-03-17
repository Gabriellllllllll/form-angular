import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  entrar(){
    const usuario = this.form.value.usuario;
    const senha = this.form.value.senha;

    if(usuario == 'gabriel' && senha == '123'){
      //login bem sucedido
      this.fakeLoading();
    }else{
      //mostra mensagem de error
      this.error();
      this.form.reset();
    }
  }

  error(){
    this._snackBar.open('Usario ou senha invalido', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(() => {

      this.router.navigate(['dashboard']);
    }, 1500);
  }
}
