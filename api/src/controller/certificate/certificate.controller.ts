/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Res,
  StreamableFile,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CertificateDto } from "src/core/dto/certificate/certificate.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { BurialService } from "src/services/burial.service";
import createReport from "docx-templates";
import fs from "fs";
import moment from "moment";
import { ConfigService } from "@nestjs/config";
import { getEnvPath } from "src/common/utils/utils";
import path from "path";

@ApiTags("certificate")
@Controller("certificate")
export class CertificateController {
  constructor(
    private burialService: BurialService,
    private readonly config: ConfigService
  ) {}

  @Get("/:burialCode")
  //   @UseGuards(JwtAuthGuard)
  async download(
    @Res({ passthrough: true }) response,
    @Param("burialCode") burialCode: string
  ): Promise<StreamableFile> {
    const res: ApiResponseModel<any> = {} as any;
    try {
      const burial = await this.burialService.getByCode(burialCode);
      if (!burial) {
        throw new Error("Burial records not found");
      }

      // console.log(this.config.get<string>("CERTIFICATE_TEMPLATE"));
      // const templatePath = this.config.get<string>("CERTIFICATE_TEMPLATE");
      const templatePath = path.resolve(__dirname, "certificate.docx");
      console.log(templatePath);
      const template = fs.readFileSync(templatePath);

      const buffer = await createReport({
        template,
        data: {
          fullName: burial?.fullName,
          dateOfDeath: moment(burial?.dateOfDeath).format("MMMM DD, YYYY"),
          dateOfBurial: moment(burial?.dateOfBurial).format("MMMM DD, YYYY"),
          familyContactPerson: burial?.familyContactPerson,
          day: moment().format("DD"),
          month: moment().format("MMMM"),
          year: moment().format("YYYY"),
        },
        cmdDelimiter: ["{", "}"],
      });

      // res.data = Buffer.from(buffer).toString("base64");
      // res.success = true;
      // res.message = `Certificate generated`;
      // return res;

      response.setHeader(
        "Content-Type",
        `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
      );

      const fileName =
        templatePath.split(".")[templatePath.split(".").length - 1];
      console.log();
      response.setHeader(
        "Content-Disposition",
        `attachment; filename=${burial.fullName}.${fileName}`
      );
      return new StreamableFile(Buffer.from(buffer));
    } catch (e) {
      // res.success = false;
      // res.message = e.message !== undefined ? e.message : e;
      // return res;
      throw new HttpException(
        e.message !== undefined ? e.message : e,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
