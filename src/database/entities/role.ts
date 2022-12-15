import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    userId!: number

    @Column()
    code!: string

    @Column()
    name!: string

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