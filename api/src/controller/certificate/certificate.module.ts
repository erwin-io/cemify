import { Module } from "@nestjs/common";
import { CertificateController } from "./certificate.controller";
import { BurialService } from "src/services/burial.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Burial } from "src/db/entities/Burial";
import { BurialModule } from "../burial/burial.module";

@Module({
  imports: [BurialModule, TypeOrmModule.forFeature([Burial])],
  controllers: [CertificateController],
  providers: [BurialService],
  exports: [BurialService],
})
export class CertificateModule {}
