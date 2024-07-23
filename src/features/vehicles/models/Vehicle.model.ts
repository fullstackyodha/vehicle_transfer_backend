import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Vehicle {
    @PrimaryColumn()
    vehicleNumber: string;

    @Column({ nullable: false })
    vehicleType: string;

    @Column({ nullable: false })
    pucCertificate: string;

    @Column({ nullable: false })
    insuranceCertificate: string;

    constructor(
        vehicleNumber: string,
        vehicleType: string,
        PUC_certificate: string,
        insurance_certificate: string
    ) {
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
        this.pucCertificate = PUC_certificate;
        this.insuranceCertificate = insurance_certificate;
    }
}
