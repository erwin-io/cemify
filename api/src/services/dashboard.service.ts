import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LOT_STATUS } from "src/common/constant/lot.constant";
import { RESERVATION_STATUS } from "src/common/constant/reservation.constant";
import { USER_TYPE } from "src/common/constant/user-type.constant";
import { Burial } from "src/db/entities/Burial";
import { Lot } from "src/db/entities/Lot";
import { Reservation } from "src/db/entities/Reservation";
import { Users } from "src/db/entities/Users";
import { In, Repository } from "typeorm";

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Lot)
    private readonly lotRepo: Repository<Lot>,
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
    @InjectRepository(Burial)
    private readonly burialRepo: Repository<Burial>,
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>
  ) {}

  async getUsers() {
    const [totalClient, totalAdmin, totalStaff] = await Promise.all([
      this.usersRepo.count({
        where: {
          userType: USER_TYPE.CLIENT,
          active: true,
        },
      }),
      this.usersRepo.count({
        where: {
          userType: USER_TYPE.ADMIN,
          active: true,
        },
      }),
      this.usersRepo.count({
        where: {
          userType: USER_TYPE.STAFF,
          active: true,
        },
      }),
    ]);
    return {
      totalClient,
      totalAdmin,
      totalStaff,
    };
  }

  async getBurialAndReservationRecords() {
    const [totalRecords, totalPending, totalForLeased] = await Promise.all([
      this.burialRepo.count({
        where: {
          active: true,
        },
      }),
      this.reservationRepo.count({
        where: {
          status: RESERVATION_STATUS.PENDING,
        },
      }),
      this.reservationRepo.count({
        where: {
          status: RESERVATION_STATUS.APPROVED,
        },
      }),
    ]);
    return {
      totalRecords,
      totalPending,
      totalForLeased,
    };
  }

  async getLot() {
    const [totalAvailable, totalOccupied, totalUnavailable] = await Promise.all(
      [
        this.lotRepo.count({
          where: {
            status: LOT_STATUS.AVAILABLE,
          },
        }),
        this.lotRepo.count({
          where: {
            status: LOT_STATUS.OCCUPIED,
          },
        }),
        this.lotRepo.count({
          where: {
            status: LOT_STATUS.UNAVAILABLE,
          },
        }),
      ]
    );
    return {
      totalAvailable,
      totalOccupied,
      totalUnavailable,
    };
  }

  async getLotTrackerByBlock() {
    return await this.burialRepo.manager
      .query(
        `
		select l."Block" as "block", COUNT(b."BurialId") as "count" 
        from dbo."Burial" b LEFT JOIN dbo."Lot" l ON b."LotId" = l."LotId" GROUP BY l."Block"`
      )
      .then((res) => {
        const result = res.reduce((acc, current) => {
          // Convert block to lowercase and count to number
          const key = current.block.toLowerCase();
          const value = parseInt(current.count, 10);
          // Assign the key-value pair to the accumulator object
          acc[key] = value;
          return acc;
        }, {} as Record<string, number>);

        console.log(result);

        return {
          a: result["a"] ?? 0,
          b: result["b"] ?? 0,
          c: result["c"] ?? 0,
          d: result["d"] ?? 0,
          e: result["e"] ?? 0,
        };
      });
  }

  async getAnnualBurialReport(yearFrom, yeartTo) {
    const burialIds = await this.burialRepo.manager
      .query(
        `
      SELECT "BurialId" as "burialId"
      FROM 
          dbo."Burial"
          
      WHERE "Active" = true
          AND EXTRACT(year FROM "LeasedDate"::timestamp) between ${yearFrom} AND ${yeartTo}
      ORDER BY 
          "LeasedDate" asc;

      `
      )
      .then((res) => {
        return res ? res.map((x) => x.burialId) : [];
      });

    return this.burialRepo.find({
      where: {
        burialId: In(burialIds),
        active: true,
      },
      relations: {
        lot: true,
      },
    });
  }

  async getMonthlyBurialReport(year) {
    const burialIds = await this.burialRepo.manager
      .query(
        `
        SELECT "BurialId" as "burialId"
        FROM 
            dbo."Burial"
            
        WHERE "Active" = true
        AND EXTRACT(year FROM "LeasedDate"::timestamp) = ${year}
        ORDER BY "LeasedDate" asc
      `
      )
      .then((res) => {
        return res ? res.map((x) => x.burialId) : [];
      });

    return this.burialRepo.find({
      where: {
        burialId: In(burialIds),
        active: true,
      },
      relations: {
        lot: true,
      },
    });
  }
}
