import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class AssignedVehicles {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: false })
    vehicleNumber: string;

    @Column({ nullable: false })
    driverId: string;

    @Column({ type: 'timestamp', nullable: false })
    assignedDate: string;

    constructor(id: string, vehicleNumber: string, driverId: string, assignedDate: string) {
        this.id = id;
        this.vehicleNumber = vehicleNumber;
        this.driverId = driverId;
        this.assignedDate = assignedDate;
    }
}
