import { Asignacion } from "src/asignacion/entities/asignacion.entity";
import { Entrenador } from "src/entrenador/entities/entrenador.entity";
import { Plan } from "src/plan/entities/plan.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('alumno')
export class Alumno {

    @PrimaryGeneratedColumn()
    idAlumno:number

    @Column()
    peso:number

    @Column()
    altura:number;

    @Column()
    fechaInicio:Date;

    @Column()
    lesiones:string;

    @OneToOne(()=>Usuario)
    @JoinColumn()
    rol:Usuario;

    @ManyToOne(()=> Plan, planes => planes.planAlumno)
    @JoinColumn()
    idPlan:Plan;

    @ManyToOne(()=> Asignacion, asignacion => asignacion.idAlumno)
    asignaciones:Asignacion[];

    @ManyToOne(()=> Entrenador, entrenador => entrenador.alumnos)
    @JoinColumn()
    idEntrenador:Entrenador;

    constructor(peso:number, altura:number, fechaInicio:Date, lesiones:string){
        this.peso= peso;
        this.altura= altura;
        this.fechaInicio= fechaInicio;
        this.lesiones= lesiones;
    }

    public getPeso():number{return this.peso;}
    public setPeso(peso:number):void{this.peso = peso;}

    public getAltura():number{return this.altura;}
    public setAltura(altura:number):void{this.altura = altura;}

    public getFechaInicio():Date{return this.fechaInicio;}
    public setFechaInicio(fechaInicio:Date):void{this.fechaInicio = fechaInicio;}

    public getLesiones():string{return this.lesiones;}
    public setLesiones(lesiones:string):void{this.lesiones = lesiones;}
}
