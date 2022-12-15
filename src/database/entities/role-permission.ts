import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class RolePermission {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    roleId!: number

    @Column()
    permissionId!: number

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