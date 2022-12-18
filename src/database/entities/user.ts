import moment from "moment";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Role } from "./role";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string

    @Column()
    password!: string

    @Column()
    fullName!: string

    @Column()
    phone!: string

    @Column()
    email!: string

    @Column()
    address!: string

    @Column()
    lastLoginIp!: string

    @Column()
    lastLoginTime!: Date

    @Column({
        default: false
    })
    deleteFlag!: boolean

    @Column({
        default: moment().format("YYYY-MM-DD HH:mm:ss")
    })
    createdAt!: Date

    @Column()
    createdBy!: number

    @Column({
        default: moment().format("YYYY-MM-DD HH:mm:ss")
    })
    updatedAt!: Date

    @Column({
        nullable: true
    })
    updatedBy!: number

    @ManyToOne(() => Role, (role) => role.users)
    role!: Role
}
