import { Burial } from "./burial.model";
import { Reservation } from "./reservation.model";

export class Pan {
  x?: string;
  y?: string;
}
export class MapData {
  x?: string;
  y?: string;
  width?: string;
  height?: string;
  transform?: string;
  pan?: Pan;
  zoom?: string;
}

export class Lot {
  lotId: string;
  lotCode: string;
  block?: string;
  level?: string;
  mapData?: MapData;
  status?: "AVAILABLE" | "OCCUPIED" | "UNAVAILABLE";
  burials?: Burial[];
  burial?: Burial;
  reservations?: Reservation[];
}
