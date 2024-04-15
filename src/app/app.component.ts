import { Component , OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TodosService } from './app.service';


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [],
})
export class AppComponent {
  title = 'my-app';
  data: string = '';
  array : any = []
  constructor(private TodoService: TodosService) { 
  }
  ngOnInit(){
    this.getData()
  }
  getData(query: string = ''){    
    this.array= this.TodoService.getTodos(query)
  }
  onEnter() {
    if(this.data != '') {
      this.array.push({text: this.data, completed: false})
      localStorage.setItem('array', JSON.stringify(this.array));
      this.data = '';
      this.getData();
    }
  }
  new() {
    if(this.data != '') {
      this.array.push({text: this.data, completed: false})
      localStorage.setItem('array', JSON.stringify(this.array));
      this.data = '';
      this.getData();
    }
  }
  update(event:any,item:any) {
    const newValue = event.target.innerText.trim()
    const savedTodos = localStorage.getItem('array');
    if (savedTodos) {
      this.array = JSON.parse(savedTodos);
      this.array[item].text = newValue
      localStorage.setItem('array', JSON.stringify(this.array));
      this.getData()
    } 
  }
  onEnterEdit(event:any,item:any) {
    const newValue = event.target.innerText.trim()
    const savedTodos = localStorage.getItem('array');
    if (savedTodos) {
      this.array = JSON.parse(savedTodos);
      this.array[item].text = newValue
      localStorage.setItem('array', JSON.stringify(this.array));
      this.getData()
    }   
  }
  delete(item:any) {  
    const savedTodos = localStorage.getItem('array');
    if (savedTodos) {
      this.array = JSON.parse(savedTodos);
      this.array.splice(item, 1);
      localStorage.setItem('array', JSON.stringify(this.array));
      this.getData()
    }     
  }
  complete(item:any, stt:any){
    item.completed = !item.completed; 
    const savedTodos = localStorage.getItem('array');
    if (savedTodos) {
      this.array = JSON.parse(savedTodos);
      this.array[stt].completed = item.completed
      localStorage.setItem('array', JSON.stringify(this.array));
      this.getData()
    }   
  }

  search(str:any){    
    this.getData(str)
  }
}
