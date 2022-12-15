import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    username?: string

    @Column()
    fullName?: string

    @Column()
    address?: string

    @Column()
    createdTime?: Date

    @Column()
    createdUser?: number

    @Column()
    updatedTime?: Date

    @Column()
    updatedUser?: number
}
