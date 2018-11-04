import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  RequestOptionsArgs,
  Jsonp
} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {
  ICarMakes
} from './../../../entities/CarMakes';
@Injectable()
export class CarAdService {
  sendCode(code: any): any {
    return this._http.get("http://localhost:8000/api/CarAds/varify_number/" + code).pipe(map(
      (res: any) => res.json())

    );
  }
  constructor(private _http: Http) {}
  getCarManufactureList(): Observable < any[] > {

    return this._http.get("http://localhost:8000/api/CarMakes")
      .pipe(
         map((response: Response) => < ICarMakes[] > response.json())
      ).
        _catch(this.handleError);
  }

  private handleError(error: Response): Observable < ICarMakes[] > {
    
    return Observable.throw(error.json().error || "Server Error");

  }
  private handleError2(error: Response): Observable < ICarMakes[] > {

    return Observable.throw(error.json());

  }
  getCarModals(id: String): Observable < any[] > {

    return this._http.get("http://localhost:8000/api/CarModels/" + id)
      .pipe(map((response: Response) => < any[] > response.json()));

  }
  saveCarAd(model) {

    return this._http.post("http://localhost:8000/api/CarAds", model)
      .pipe(map((response: Response) => response.json()));
  }
  getCarAds(): Observable < any[] > {

    return this._http.get("http://localhost:8000/api/CarAds").pipe(map((res: Response) => < any[] > res.json()));
  }
  getActiveCarAds(state ? : Boolean): Observable < any[] > {

    if (state == null) {

      state = true;
    }

    return this._http.get("http://localhost:8000/api/CarAds/active/" + state).pipe(map((res: Response) => < any[] > res.json()));
  }
  getCarAdById(id: string): Observable < any > {
    return this._http.get("http://localhost:8000/api/CarAds/" + id).pipe(map((res: Response) => < any > res.json()));
  }

  updateCarAd(entity, id) {
    var requestOptions = new RequestOptions()
    return this._http.put("http://localhost:8000/api/CarAds/" + id, entity).pipe(map((res: Response) => < any > res.json()));
  }
  deleteCarAd(id) {
   // var requestOptions = new RequestOptions()
   // return this._http.delete("http://localhost:8000/api/CarAds/" + id).map((res: Response) => < any > res.json());
    var requestOptions = new RequestOptions()
    return this._http.delete("http://localhost:8000/api/CarAds/" + id).pipe(map((res: Response) => <any> res.json()));
  }
}
