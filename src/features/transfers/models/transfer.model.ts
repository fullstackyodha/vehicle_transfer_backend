import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TransferHistory {
    @PrimaryColumn()
    transferId: string;

    @Column()
    vehicleNumber: string;

    @Column()
    fromDriverId: number;

    @Column()
    toDriverId: number;

    @Column({ type: 'timestamp', nullable: false })
    transferDate: string;

    constructor(
        transferId: string,
        vehicleNumber: string,
        fromDriverId: number,
        toDriverId: number,
        transferDate: string
    ) {
        this.transferId = transferId;
        this.vehicleNumber = vehicleNumber;
        this.fromDriverId = fromDriverId;
        this.toDriverId = toDriverId;
        this.transferDate = transferDate;
    }
}
