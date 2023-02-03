import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {BoardModel} from "./BoardModel";
import {TaskModel} from "./TaskModel";

@Entity("task_priorities")
export class TaskPriorityModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => TaskModel, (task) => task.priority)
    @JoinColumn({
        name: "priority_id"
    })
    tasks: TaskModel[];
}
