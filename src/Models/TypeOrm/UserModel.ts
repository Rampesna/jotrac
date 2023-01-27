import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    OneToMany,
    JoinColumn,
    ManyToMany,
    JoinTable
} from "typeorm";
import {ProjectModel} from "./ProjectModel";

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

    @ManyToMany(
        () => ProjectModel,
        project => project.users,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        }
    )
    @JoinTable(
        {
            name: 'project_user',
            joinColumn: {
                name: 'user_id',
                referencedColumnName: 'id',
            },
            inverseJoinColumn: {
                name: 'project_id',
                referencedColumnName: 'id',
            },
        }
    )
    projects?: ProjectModel[];
}

