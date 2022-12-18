import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Menu } from "./menu";
import { Permission } from "./permission";
import { User } from "./User";

@Entity()
export class Role {
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

    @OneToMany(() => User, (user) => user.role)
    users!: User[];

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({ name: "Role_Permission" })
    permissions!: Permission[]

    @ManyToMany(() => Menu, (menu) => menu.roles)
    @JoinTable({ name: "Role_Menu" })
    menus!: Menu[]
}