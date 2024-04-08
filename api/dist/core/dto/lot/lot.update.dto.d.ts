export declare class PanMapData {
    x: string;
    y: string;
}
export declare class LotMapDataDto {
    x: string;
    y: string;
    width: string;
    height: string;
    transform?: string;
    pan: PanMapData;
    zoom: string;
}
export declare class UpdateLotMapDataDto {
    mapData: LotMapDataDto;
}
