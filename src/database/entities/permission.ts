import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id!: number

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