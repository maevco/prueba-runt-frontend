import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Asignatura } from 'src/app/modelo/Asignatura';
import { Profesor } from 'src/app/modelo/Profesor';
import { ProfesorService } from 'src/app/service/profesor.service';
import { AsignaturaService } from 'src/app/service/asignatura.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  profesores!: Profesor[];
  miFormulario!: FormGroup;
  error!: String;
  displayedColumns: string[] = ['id','materia','profesor','grado','salon','estudiante'];
  dataSource!: MatTableDataSource<Asignatura>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private profesorService: ProfesorService, private asignaturaService: AsignaturaService) { 

    this.miFormulario = new FormGroup({      
      'profesor': new FormControl('', [
        Validators.required
      ])
    });
  }

  buscarAsignatura(id:number){    
    this.asignaturaService.getAsignatura(this.miFormulario.value.profesor.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);   
        this.dataSource.paginator = this.paginator;    
        this.dataSource.sort = this.sort; 
      }, error => {
        this.error = error;
        alert(error);
      });
  }

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  

  ngOnInit(): void {
    /* LLenar el comobo de profesores*/
    this.profesorService.getProfesor()
      .subscribe(data => {
        this.profesores = data;
      });
  }

  ngAfterViewInit() {
    this.asignaturaService.getAsignaturaAll()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);   
      this.dataSource.paginator = this.paginator;    
      this.dataSource.sort = this.sort; 
    }, error => {
      this.error = error;
      alert(error);
    });
  }
}
