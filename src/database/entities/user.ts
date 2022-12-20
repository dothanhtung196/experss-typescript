import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert, BeforeRemove } from "typeorm";
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

    @CreateDateColumn()
    createdAt!: Date

    @Column()
    createdBy!: number

    @UpdateDateColumn()
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

    @ManyToOne(() => Role, (role) => role.users)
    role!: Role
}
