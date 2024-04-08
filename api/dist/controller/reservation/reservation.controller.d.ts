import { CreateReservationDto } from "src/core/dto/reservation/reservation.create.dto";
import { UpdateReservationDto, UpdateReservationStatusDto } from "src/core/dto/reservation/reservation.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Reservation } from "src/db/entities/Reservation";
import { ReservationService } from "src/services/reservation.service";
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    getDetails(reservationCode: string): Promise<ApiResponseModel<Reservation>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Reservation[];
        total: number;
    }>>;
    create(reservationDto: CreateReservationDto): Promise<ApiResponseModel<Reservation>>;
    update(reservationCode: string, dto: UpdateReservationDto): Promise<ApiResponseModel<Reservation>>;
    updateStatus(reservationCode: string, dto: UpdateReservationStatusDto): Promise<ApiResponseModel<Reservation>>;
}
