import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {ProjectStatusModel} from "./ProjectStatusModel";
import {ProjectModel} from "./ProjectModel";
import {TaskModel} from "./TaskModel";

@Entity("boards")
export class BoardModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProjectModel, (project) => project.boards)
    @JoinColumn({
        name: "project_id"
    })
    project: ProjectModel;

    @Column()
    name: string;

    @Column({
        unsigned: true
    })
    order: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => TaskModel, (task) => task.board, {})
    tasks: TaskModel[];
}

