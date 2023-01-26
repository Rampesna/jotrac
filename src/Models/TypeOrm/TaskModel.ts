import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {BoardModel} from "./BoardModel";
import {TaskPriorityModel} from "./TaskPriorityModel";
import {SubTaskModel} from "./SubTaskModel";

@Entity("tasks")
export class TaskModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unsigned: true
    })
    order: number;

    @Column({
        nullable: true
    })
    description: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => BoardModel, (board) => board.tasks)
    @JoinColumn({
        name: "board_id"
    })
    board: BoardModel;

    @ManyToOne(() => TaskPriorityModel, (taskPriority) => taskPriority.tasks)
    @JoinColumn({
        name: "priority_id"
    })
    priority: TaskPriorityModel;

    @OneToMany(() => SubTaskModel, (subTask) => subTask.task, {})
    subTasks: SubTaskModel[];
}

