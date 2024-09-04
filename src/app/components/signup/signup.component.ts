import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phones: this.formBuilder.array([]),
    });
  }

  get phones():FormArray {
    return this.signupForm.get('phones') as FormArray
  }

  newPhone() {
    return this.formBuilder.control('',[Validators.required, Validators.pattern(/^01(0|1|2|5)[0-9]{8}$/g)])
  }

  addPhone() {
    this.phones.push(this.newPhone())
  }

  removePhone(index: number) {
    this.phones.removeAt(index)
  }

  isInvalid(inputName: string): boolean {
    const inputFormControl = this.signupForm.get(inputName);
    return (inputFormControl?.dirty || inputFormControl?.touched) &&
      inputFormControl?.invalid
      ? true
      : false;
  }

  handleSignup() {
    this.userService.createUser(this.signupForm.value).subscribe(data=>console.log(data)) 
  }
}
