import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TransferHistory {
    @PrimaryColumn()
    transferId: string;

    @Column()
    vehicleNumber: string;

    @Column()
    fromDriverId: string;

    @Column()
    toDriverId: string;

    @Column({ type: 'timestamp' })
    transferDate: string;

    constructor(
        transferId: string,
        vehicleNumber: string,
        fromDriverId: string,
        toDriverId: string,
        transferDate: string
    ) {
        this.transferId = transferId;
        this.vehicleNumber = vehicleNumber;
        this.fromDriverId = fromDriverId;
        this.toDriverId = toDriverId;
        this.transferDate = transferDate;
    }
}
