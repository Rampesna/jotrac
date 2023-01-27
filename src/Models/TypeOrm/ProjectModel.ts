import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne,
    ManyToMany
} from "typeorm";
import {ProjectStatusModel} from "./ProjectStatusModel";
import {BoardModel} from "./BoardModel";
import {UserModel} from "./UserModel";

@Entity("projects")
export class ProjectModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

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

    @OneToMany(() => BoardModel, (board) => board.project, {})
    boards: BoardModel[];

    @ManyToMany(
        () => UserModel,
        user => user.projects
    )
    users?: UserModel[];

    @ManyToOne(() => ProjectStatusModel, (projectStatus) => projectStatus.projects)
    @JoinColumn({
        name: "status_id"
    })
    status: ProjectStatusModel;
}
