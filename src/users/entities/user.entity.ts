import { Contact } from "src/contacts/entities/contact.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    secondName?: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    secondPhone?: string;

    @Column({ nullable: true})
    address?: string;

    @Column({ nullable: true})
    img?: string

    @CreateDateColumn({ select: false })
    createdAt: Date;
  
    @UpdateDateColumn({ select: false })
    updatedAt: Date;

    @DeleteDateColumn({ select: false})
    deleteAt: Date;

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[]
}
