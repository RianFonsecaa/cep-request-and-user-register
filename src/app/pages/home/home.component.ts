import { Component } from '@angular/core';
import { FormComponent } from "../../components/form/form.component";
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormComponent, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}