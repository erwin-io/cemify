import { v4asuuid } from 'uuid';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as svgPanZoom from 'svg-pan-zoom';
import Panzoom, { PanzoomObject } from '@panzoom/panzoom'
import { debounceTime, forkJoin, Subject, Observable, of, takeUntil, catchError, filter } from 'rxjs';
import { LotService } from 'src/app/services/lot.service';
import { Lot } from 'src/app/model/lot.model';
import { ApiResponse } from 'src/app/model/api-response.model';


@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})
export class MapBoxComponent implements OnInit{

  isLoading = false;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @Output() onLoadComplete = new EventEmitter();
  @Output() onSelectChange = new EventEmitter<any>();

  @Input() showLegend = false;
  @Input() disablePan = false;
  @Input() disableSelection = false;
  @Input() mode: "NAVIGATE" | "PICK" = "NAVIGATE";

  @ViewChild("map") map: ElementRef<SVGElement>

  panZoom: PanzoomObject;

  savedSelected: {
    block: string;
    lotCode: string;
  };

  selectedLot: {
    block: string;
    lotCode: string;
  };

  lot: {
    a: any[];
    b: any[];
    c: any[];
    d: any[];
    e: any[];
  } = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
  }

  selectorSize = 1;

  constructor(private lotService: LotService) {
  }

  get getZoom() {
    return this.panZoom.getScale() ? this.panZoom.getScale() : 0;
  }

  zoomIn(x: number, y: number, scale: number) {
  this.panZoom.zoomIn({
    startX: x,
    startY: x,
    startScale: scale,
  });
  this.resizeSelector(scale);
  }

  setZoom(zoom: number) {
    this.panZoom.zoom(zoom);
  }

  setPan(x , y) {
    this.panZoom.pan(x, y, { animate: true});
  }

  selectLot(lotCode, block, saveSelected?) {
    this.selectedLot = {
      block,
      lotCode,
    };
    if(saveSelected) {
      this.savedSelected = this.selectedLot;
      document.querySelector(`#${lotCode}`).classList.add("selected");
    }
    if(document.querySelector(`#${lotCode}`)) {
      document.querySelectorAll(".lot").forEach(res=> {
        res.classList.remove("active");
      })
      document.querySelector(`#${lotCode}`).classList.add("active");
      const x = document.querySelector(`#${lotCode}`).getAttribute("x");
      const y = document.querySelector(`#${lotCode}`).getAttribute("y");
      const width = document.querySelector(`#${lotCode}`).getAttribute("width");
      const height = document.querySelector(`#${lotCode}`).getAttribute("height");
      const transform = document.querySelector(`#${lotCode}`).getAttribute("transform");
      const classList = document.querySelector(`#${lotCode}`).classList;
      if(document.querySelector(`.selector`)) {
        document.querySelector(`.selector`).setAttribute("x", x);
        document.querySelector(`.selector`).setAttribute("y", y);
        document.querySelector(`.selector`).setAttribute("width", width);
        document.querySelector(`.selector`).setAttribute("height", height);
        document.querySelector(`.selector`).setAttribute("transform", transform);
        document.querySelector(`.selector`).setAttribute("class", `selector ${Array.from(classList).join(" ")}`);
      } else {
        setTimeout(()=> {
          this.selectLot(lotCode, block);
        }, 100);
      }
    }
  }

  updateLotStatus(lotCode, status) {
    const classList = document.querySelector(`#${lotCode}`).classList;
    const newClass = Array.from(classList).filter(x=> !["AVAILABLE","OCCUPIED","UNAVAILABLE"].some(s => s.toLowerCase() === x));
    document.querySelector(`#${lotCode}`).setAttribute("class", `${Array.from(newClass).join(" ")} ${status.toLowerCase()}`);
  }

  clearSelection() {
    this.selectedLot = null;
    const selected = document.querySelectorAll("foreignObjects.selected");
    selected.forEach(l=> {
      const newClass = Array.from(l.classList).filter(x=> !x.includes("selected")).join(" ");
      l.setAttribute("class", newClass)
    });
    const active = document.querySelectorAll("foreignObjects.active");
    selected.forEach(l=> {
      const newClass = Array.from(l.classList).filter(x=> !x.includes("active")).join(" ");
      l.setAttribute("class", newClass)
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    forkJoin([
      this.lotService.getByBlock("A"),
      this.lotService.getByBlock("B"),
      this.lotService.getByBlock("C"),
      this.lotService.getByBlock("D"),
      this.lotService.getByBlock("E"),
    ]).pipe(
      takeUntil(this.ngUnsubscribe),
      catchError(this.handleError('lot', []))
    ).subscribe((res: ApiResponse<Lot[]>[]) => {
      // console.log(res);
      const a = res[0].data.sort((a, b) => {
        return Number(a.lotId) - Number(b.lotId);
      }).map(res=> this.createBox(res));
      const b = res[1].data.sort((a, b) => {
        return Number(a.lotId) - Number(b.lotId);
      }).map(res=> this.createBox(res));
      const c = res[2].data.sort((a, b) => {
        return Number(a.lotId) - Number(b.lotId);
      }).map(res=> this.createBox(res));
      const d = res[3].data.sort((a, b) => {
        return Number(a.lotId) - Number(b.lotId);
      }).map(res=> this.createBox(res));
      const e = res[4].data.sort((a, b) => {
        return Number(a.lotId) - Number(b.lotId);
      }).map(res=> this.createBox(res));

      for (const lot of a) {
        document.querySelector(".block-a").appendChild(lot);
      }

      for (const lot of b) {
        document.querySelector(".block-b").appendChild(lot);
      }

      for (const lot of c) {
        document.querySelector(".block-c").appendChild(lot);
      }

      for (const lot of d) {
        document.querySelector(".block-d").appendChild(lot);
      }

      for (const lot of e) {
        document.querySelector(".block-e").appendChild(lot);
      }

      let blocks = document.querySelectorAll(".block");
      blocks.forEach(element=> {
         const foreignObjects = element.querySelectorAll("foreignObject");
         foreignObjects.forEach(p=> {
          if(!this.disableSelection) {
            p.addEventListener("click", ()=> {
              const lotCode = p.getAttribute("id");
              const block = p.getAttribute("block");
              const status: "AVAILABLE" | "OCCUPIED" | "UNAVAILABLE" = p.getAttribute("status") as any;
              if( this.savedSelected && this.savedSelected?.lotCode === lotCode ? true : status === "AVAILABLE") {
                this.onSelectChange.emit({lotCode,block})
                this.selectLot(lotCode,block);
              } else if(status === "AVAILABLE") {
                this.onSelectChange.emit({lotCode,block})
                this.selectLot(lotCode,block);
              } else if(this.mode === "NAVIGATE" && this.showLegend) {
                this.onSelectChange.emit({lotCode,block})
                this.selectLot(lotCode,block);
              }
            });
          }
         })

      });
      setTimeout(()=> {
        this.onLoadComplete.emit();
      }, 500)
    })
  }

  ngAfterViewInit() {
    this.panZoom = Panzoom(this.map.nativeElement, { contain: 'outside', startScale: 1, maxScale: 20 })
    this.map.nativeElement.parentElement.addEventListener('wheel', this.panZoom.zoomWithWheel);
    this.map.nativeElement.parentElement.addEventListener('wheel', ()=> {
      console.log(this.panZoom.getScale());
      this.resizeSelector(this.panZoom.getScale());
    });
  }


  handleError<T>(operation = 'operation', result?: any) {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    return (error: any): Observable<any> => {
      return of(error.error as any);
    };
  }

  createBox(lot: Lot) {
    const foreignObject = document.createElementNS("http://www.w3.org/2000/svg","foreignObject");
    const label = document.createElement("span");
    const container = document.createElement("span");
    container.setAttribute("class", "lot-container");
    label.innerText = lot.lotCode;
    container.appendChild(label);
    // const pin = document.createElement("img");
    // pin.src="../../../assets/img/pin-location.png"
    // container.appendChild(pin);
    foreignObject.setAttribute("x", lot.mapData?.x);
    foreignObject.setAttribute("y", lot.mapData?.y);
    foreignObject.setAttribute("id", lot.lotCode);
    foreignObject.setAttribute("block", lot.block);
    foreignObject.setAttribute("status", lot.status);
    foreignObject.setAttribute("width", lot.mapData?.width);
    foreignObject.setAttribute("height", lot.mapData?.height);
    foreignObject.setAttribute("transform", lot.mapData?.transform);
    let classList = ["lot"];
    if(lot.mapData?.transform && lot.mapData?.transform !== "" && lot.mapData?.transform.includes("rotate(-")) {
      classList.push("reverse-rotate")
    } else if(lot.mapData?.transform && lot.mapData?.transform !== "" && lot.mapData?.transform.includes("rotate(")) {
      classList.push("rotate");
    }
    classList.push(lot.status.toLowerCase());
    foreignObject.setAttribute("class", classList.join(" "));
    foreignObject.append(container);
    return foreignObject;
  }

  resizeSelector(zoom) {
    if(zoom <= 20 && zoom >= 16.1) {
      this.selectorSize = 0.08;
    } else if(zoom <= 16 && zoom >= 14.1) {
      this.selectorSize = 0.09;
    } else if(zoom <= 14 && zoom >= 12.1) {
      this.selectorSize = 0.10;
    } else if(zoom <= 12 && zoom >= 10.1) {
      this.selectorSize = 0.12;
    } else if(zoom <= 10 && zoom >= 9.1) {
      this.selectorSize = 0.14;
    } else if(zoom <= 9 && zoom >= 8.1) {
      this.selectorSize = 0.15;
    } else if(zoom <= 8 && zoom >= 7.1) {
      this.selectorSize = 0.18;
    } else if(zoom <= 7 && zoom >= 6) {
      this.selectorSize = 0.21;
    } else if(zoom <= 5.9 && zoom >= 4.3) {
      this.selectorSize = 0.24;
    } else if(zoom <= 4.2 && zoom >= 3.3) {
      this.selectorSize = 0.27;
    } else if(zoom <= 3.2 && zoom >= 2.6) {
      this.selectorSize = 0.34;
    } else if(zoom <= 2.5 && zoom >= 2.0) {
      this.selectorSize = 0.38;
    } else if(zoom <= 1.99 && zoom >= 1.7) {
      this.selectorSize = 0.48;
    } else if(zoom <= 1.69 && zoom >= 1.5) {
      this.selectorSize = 0.65;
    } else if(zoom <= 1.4 && zoom >= 1.2) {
      this.selectorSize = 0.75;
    } else if(zoom <= 1.1 && zoom >= 1.09) {
      this.selectorSize = 0.58;
    } else if(zoom <= 1.08 && zoom >= 1.04) {
      this.selectorSize = 0.71;
    } else if(zoom <= 1.03 && zoom >= 1) {
      this.selectorSize = 0.85;
    } else if(zoom <= 0.9 && zoom >= 0.8) {
      this.selectorSize = 1;
    }
  }
}
