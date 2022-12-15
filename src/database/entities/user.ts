import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
    statusId!: number

    @Column()
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
}
