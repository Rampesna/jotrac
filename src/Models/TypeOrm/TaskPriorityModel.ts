import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, JoinColumn, ManyToOne} from "typeorm";
import {BoardModel} from "./BoardModel";
import {TaskModel} from "./TaskModel";

@Entity("task_priorities")
export class TaskPriorityModel {
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

    @Column({
        nullable: true
    })
    start_date: Date;

    @Column({
        nullable: true
    })
    end_date: Date;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => TaskModel, (task) => task.priority)
    @JoinColumn({
        name: "priority_id"
    })
    tasks: TaskModel[];
}

