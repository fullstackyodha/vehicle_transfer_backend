import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Driver {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    phoneNumber: string;

    @Column({
        nullable: false
    })
    profilePhoto: string;

    constructor(id: number, name: string, phone_number: string, profile_photo: string) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phone_number;
        this.profilePhoto = profile_photo;
    }
}
