import { Module } from "@nestjs/common";
import { DashboardController } from "./dashboard.controller";
import { Users } from "src/db/entities/Users";
import { DashboardService } from "src/services/dashboard.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Burial } from "src/db/entities/Burial";
import { Lot } from "src/db/entities/Lot";
import { Reservation } from "src/db/entities/Reservation";

@Module({
  imports: [TypeOrmModule.forFeature([Burial, Users, Lot, Reservation])],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
