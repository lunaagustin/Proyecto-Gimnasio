import { Alumno } from "src/alumno/entities/alumno.entity";
import { Rutina } from "src/rutina/entities/rutina.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('asignacion')
export class Asignacion {
    @PrimaryGeneratedColumn()
    idAsignacion:number;

    @Column()
    fechaAsignada:Date;

    @Column()
    estado:string;

    @ManyToOne(()=> Rutina, rutina => rutina.asignaciones )
    @JoinColumn()
    idRutina:Rutina;

    @ManyToOne(()=> Alumno, alumno => alumno.asignaciones)
    @JoinColumn()
    idAlumno:Alumno;

    constructor(fechaAsignada:Date, estado:string){
        this.fechaAsignada = fechaAsignada;
        this.estado= estado;
    }

    public getFechaAsignada():Date{return this.fechaAsignada;}
    public setFechaAsignada(fechaAsignada:Date):void{this.fechaAsignada = fechaAsignada;}

    public getEstado():string{return this.estado;}
    public setEstado(estado:string):void{this.estado = estado;}
}
