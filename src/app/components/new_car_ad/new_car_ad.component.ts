import { Component, OnInit, enableProdMode } from "@angular/core";
import {
  FormGroup,
  FormsModule,
  FormControl,
  ReactiveFormsModule
} from "@angular/forms";
import { NewCarAdModal } from "./new_car_ad";
import { CarAdService } from "../services/carAd/carAd.service";
import { ICarMakes } from "./../../entities/CarMakes";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { Router } from "@angular/router";
import { NewCarAdModel } from "./../../entities/new_car_ad";
import { ICarAd } from './../car_ads/car_ad';
@Component({
  
  templateUrl: "new_car_ad.component.html"
})
export class NewCarAdComponent implements OnInit {
  pageTitle: string = "New Car Ad";
  errMsg: any[];
  code: any;
  varif_code_model = {};
  carMakes: ICarMakes[];
  selectedCarMakeId: string;
  selectedCarMakeName: string;
  selectedCarModelId: string;
  selectedCarModelName: string;
  otherCarModelName: string;
  otherCarMakeName: string;
  //selectedFile:File=null;
  selectedFile: File[] = null;
  isAdSumbitted: boolean;
  messageOnAdSubmission: string;
  showOtherCarMake: boolean;
  show_varification: Boolean;

  //carMakes:any[];
  carModels: any[];
  //myform: FormGroup;
  model = new NewCarAdModel();

  constructor(private _carAdService: CarAdService, private router: Router) {}
  register(): void {
    // this.model.car_image=this.selectedFile;
    console.log(
      "Form is subumitted Successfully:" + JSON.stringify(this.model)
    );
    let formData: any = new FormData();
    // formData.append('car_image',  this.selectedFile[0],this.selectedFile[0].name);
    for (let i = 0; i < this.selectedFile.length; i++) {
      formData.append(
        "car_image",
        this.selectedFile[i],
        this.selectedFile[i].name
      );
    }
    formData.append("car_description", this.model.car_description);
    formData.append("car_price", this.model.car_price);
    formData.append("car_km_driven", this.model.km_driven);
    formData.append("car_engine_type", this.model.car_engine_type);
    formData.append("car_model_year", this.model.car_model_year);
    formData.append("car_transmission_type", this.model.car_transmission_type);
    formData.append("car_engine_capacity", this.model.car_engine_capacity);
    formData.append("contact_number", this.model.contact_number);
    formData.append("car_model_id", this.model.car_model_id);
    if (this.showOtherCarMake) {
      formData.append("car_make_name", this.otherCarMakeName);
      formData.append("car_model_name", this.otherCarModelName);
    } else {
      formData.append("car_make_name", this.selectedCarMakeName);
      formData.append("car_make_id", this.selectedCarMakeId);
      formData.append("car_model_id", this.selectedCarModelId);
      formData.append("car_model_name", this.selectedCarModelName);
    }

    this.router.navigate(['/varify_number']);
    // this._carAdService.saveCarAd(formData).subscribe(data=>
    //   {
    //    console.log(data);
    //    this.router.navigate(['/car_ads']);
    //    },
    //    error=>{
    //       console.log("error");
    //        console.log(error);
    //   });
  } // end register()

  onFileSelect(event) {
    let reader = new FileReader();
    this.selectedFile = event.target.files;

    console.log(event);
  }
  log(x) {
    console.log(x);
  }
  get diagnostic() {
    return JSON.stringify(this.model);
  }
  ngOnInit(): void {
    this.isAdSumbitted = false;
    this.showOtherCarMake = false;
    this.show_varification = false;
    this.loadData();
  }
  loadData(): void {
    this._carAdService.getCarManufactureList().subscribe(
      carMakes => {
        this.carMakes = carMakes;
        console.log(carMakes);
      },
      error => {
        this.errMsg = error;
      }
    );
    this.selectedCarMakeId = "5ad83526708fdb3b4aa67929";
  }
  onMakeSelect(carMakeId): void {
    console.log("CarMake id:" + carMakeId);
    this.selectedCarMakeId = carMakeId;
    this.selectedCarMakeName = this.carMakes.find(
      x => x._id == this.selectedCarMakeId
    ).car_make;
    console.log("..." + this.selectedCarMakeName);
    if (this.selectedCarMakeName == "other") {
      this.showOtherCarMake = true;
    } else {
      this.showOtherCarMake = false;
      this._carAdService.getCarModals(carMakeId).subscribe(
        carModels => {
          this.carModels = carModels;
        },
        error => {
          this.errMsg = error;
        }
      );
      // console.log("car models"+ JSON.stringify(carModels));
    }
  }
  onCarModelSelect(model_id): void {
    this.selectedCarModelName = this.carModels.find(
      x => x._id == this.selectedCarModelId
    ).car_model;
  }
}
