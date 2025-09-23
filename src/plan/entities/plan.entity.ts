import { Alumno } from "src/alumno/entities/alumno.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('plan')
export class Plan {
    @PrimaryGeneratedColumn()
    idPlan:number;

    @Column()
    tipo:string;

    @Column()
    precio:number;

    @OneToMany(()=>Alumno, alumno=> alumno.idPlan)
    planAlumno:Plan;

    constructor(tipo:string, precio:number){
        this.tipo= tipo;
        this.precio= precio;
    }

    public getTipoPlan():string{return this.tipo;}
    public setTipoPlan(tipo:string):void{this.tipo = tipo;}

    public getPrecio():number{return this.precio;}
    public setPrecio(precio:number):void{this.precio = precio;}

}
