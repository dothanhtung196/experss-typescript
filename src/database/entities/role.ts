import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, BeforeInsert, BeforeUpdate, BeforeRemove } from "typeorm";
import { Menu } from "./menu";
import { Permission } from "./permission";
import { User } from "./User";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        unique: true
    })
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

    @BeforeInsert()
    public setCreatedAt() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    public setUpdatedAt() {
        this.updatedAt = new Date();
    }

    @BeforeRemove()
    public setDeletedAt() {
        this.updatedAt = new Date();
    }

    @OneToMany(() => User, (user) => user.role)
    users!: User[];

    @ManyToMany(() => Permission, (permission) => permission.roles)
    @JoinTable({ name: "role_permission" })
    permissions!: Permission[]

    @ManyToMany(() => Menu, (menu) => menu.roles)
    @JoinTable({ name: "role_menu" })
    menus!: Menu[]
}