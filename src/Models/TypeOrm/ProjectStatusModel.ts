import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany} from "typeorm";
import {ProjectModel} from "./ProjectModel";

@Entity("project_statuses")
export class ProjectStatusModel {
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

    @OneToMany(() => ProjectModel, (project) => project.status, {})
    projects: ProjectModel[];
}

