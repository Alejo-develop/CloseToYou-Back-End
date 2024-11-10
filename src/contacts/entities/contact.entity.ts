import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User)
    @JoinColumn({
        name: 'userId',
        referencedColumnName: 'id'
    })
    user: User

    @Column({ nullable: false })
    userId?: string;

    @Column()
    name: string;

    @Column({ nullable: true})
    email?: string;

    @Column({ nullable: true })
    secondName?: string;

    @Column({ nullable: true })
    role?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    secondPhone?: string;

    @Column({ nullable: true})
    img?: string

    @Column({ nullable: true, type: 'float' })
    latitude?: number | string;

    @Column({ nullable: true, type: 'float' })
    longitude?: number | string;
      
    @CreateDateColumn({ select: false })
    createdAt: Date;
  
    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false})
    deleteAt: Date
}
