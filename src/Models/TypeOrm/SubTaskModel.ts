import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {BoardModel} from "./BoardModel";
import {TaskPriorityModel} from "./TaskPriorityModel";
import {TaskModel} from "./TaskModel";

@Entity("sub_tasks")
export class SubTaskModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unsigned: true
    })
    order: number;

    @Column({
        default: false
    })
    completed: boolean;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => TaskModel, (task) => task.subTasks)
    @JoinColumn({
        name: "task_id"
    })
    task: TaskModel;
}
