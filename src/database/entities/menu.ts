import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, BeforeInsert, BeforeUpdate, BeforeRemove } from "typeorm";
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

    @ManyToMany(() => Role, (role) => role.menus)
    roles!: Role[]
}