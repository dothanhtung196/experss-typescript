import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { Role } from "./role";

@Entity()
export class Permission {
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

    @ManyToMany(() => Role, (role) => role.permissions)
    roles!: Role[]
}