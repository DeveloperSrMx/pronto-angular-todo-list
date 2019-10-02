import { Component, OnInit } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('moveInLeft', [
      transition('void=> *', [style({transform: 'translateX(300px)'}),
        animate('200ms ease-out', keyframes([
          style({transform: 'translateX(300px)'}),
          style({transform: 'translateX(0)'})

        ]))]),
      transition('*=>void', [style({transform: 'translateX(0px)'}),
        animate('500ms ease-in',   keyframes([
          style({transform: 'translateY(-20px)', opacity: 1, offset: 0.2}),
          style({transform: 'translateY(250px)', opacity: 0 , offset: 1})
        ]))])
    ])
  ]
})
export class AppComponent implements OnInit{

  todoArray: string[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  /**
   * Formulario reactivo con validators.
   */
  constructForm() {
    this.form = this.fb.group({
      todo: this.fb.control(null, Validators.required)
    });
  }

  /**
   * Submit del formulario, suceptible al enter.
   */
  onSubmit() {
    if (this.form.invalid) { return; }
    this.todoArray.push(this.form.get('todo').value);
    this.form.reset();
  }

  /** 
   * Eliminacion del To Do
   */
  onDeleteToDo(index) {
    this.todoArray.splice(index, 1);
  }

  /**
     *  Hook on init, se inicializa la construccion del reactive form
     **/
  ngOnInit(): void {
    this.constructForm();
  }

}
