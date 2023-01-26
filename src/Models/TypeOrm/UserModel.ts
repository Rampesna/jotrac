import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, JoinColumn } from "typeorm";

@Entity("users")
export class UserModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}

