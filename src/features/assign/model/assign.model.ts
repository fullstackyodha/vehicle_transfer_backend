import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class AssignedVehicles {
    @PrimaryColumn()
    assignmentId: string;

    @Column({ nullable: false })
    vehicleNumber: string;

    @Column({ nullable: false })
    driverId: number;

    @Column({ type: 'timestamp', nullable: false })
    assignedDate: string;

    constructor(
        assignmentId: string,
        vehicleNumber: string,
        driverId: number,
        assignedDate: string
    ) {
        this.assignmentId = assignmentId;
        this.vehicleNumber = vehicleNumber;
        this.driverId = driverId;
        this.assignedDate = assignedDate;
    }
}
