import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lot } from "./Lot";
import { Reservation } from "./Reservation";
import { WorkOrder } from "./WorkOrder";

@Index("Burial_pkey", ["burialId"], { unique: true })
@Entity("Burial", { schema: "dbo" })
export class Burial {
  @PrimaryGeneratedColumn({ type: "bigint", name: "BurialId" })
  burialId: string;

  @Column("character varying", { name: "BurialCode", nullable: true })
  burialCode: string | null;

  @Column("character varying", { name: "BurialFullName" })
  burialFullName: string;

  @Column("date", { name: "DateOfBirth" })
  dateOfBirth: string;

  @Column("date", { name: "DateOfDeath" })
  dateOfDeath: string;

  @Column("date", { name: "DateOfBurial" })
  dateOfBurial: string;

  @Column("character varying", { name: "FamilyContactPerson" })
  familyContactPerson: string;

  @Column("character varying", { name: "FamilyContactNumber" })
  familyContactNumber: string;

  @Column("boolean", { name: "FromReservation", default: () => "false" })
  fromReservation: boolean;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @Column("character varying", { name: "BurialFirstName", default: () => "''" })
  burialFirstName: string;

  @Column("character varying", {
    name: "BurialMiddleName",
    nullable: true,
    default: () => "''",
  })
  burialMiddleName: string | null;

  @Column("character varying", { name: "BurialLastName", default: () => "''" })
  burialLastName: string;

  @Column("numeric", { name: "BurialAge", default: () => "0" })
  burialAge: string;

  @Column("character varying", { name: "Address", default: () => "''" })
  address: string;

  @Column("date", {
    name: "LeasedDate",
    default: () => "(now() AT TIME ZONE 'Asia/Manila')",
  })
  leasedDate: string;

  @ManyToOne(() => Lot, (lot) => lot.burials)
  @JoinColumn([{ name: "LotId", referencedColumnName: "lotId" }])
  lot: Lot;

  @ManyToOne(() => Reservation, (reservation) => reservation.burials)
  @JoinColumn([
    { name: "ReservationId", referencedColumnName: "reservationId" },
  ])
  reservation: Reservation;

  @ManyToOne(() => WorkOrder, (workOrder) => workOrder.burials)
  @JoinColumn([{ name: "WorkOrderId", referencedColumnName: "workOrderId" }])
  workOrder: WorkOrder;
}
