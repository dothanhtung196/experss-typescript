import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Role } from "./role";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    code!: string

    @Column()
    name!: string

    @Column({
        default: false
    })
    deleteFlag!: boolean

    @Column()
    createdAt!: Date

    @Column()
    createdBy!: number

    @Column({
        nullable: true
    })
    updatedAt!: Date

    @Column({
        nullable: true
    })
    updatedBy!: number

    @ManyToMany(() => Role, (role) => role.menus)
    roles!: Role[]
}