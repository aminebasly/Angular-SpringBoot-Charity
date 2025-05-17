import { Injectable } from "@angular/core";
import { ApiConfiguration } from "../api-configuration";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "../base-service";
import { Observable } from "rxjs";
import { RefugeCenter } from "../models/refugeCenter";

@Injectable({
  providedIn: "root",
})
export class RefugeCenterService extends BaseService {
  apiBase = "/api/refuges";

  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
    this.apiBase = config.rootUrl + this.apiBase;
  }
  getAll(): Observable<RefugeCenter[]> {
    return this.http.get<RefugeCenter[]>(`${this.apiBase}`);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/${id}`);
  }
  update(id: number, refuge: RefugeCenter): Observable<RefugeCenter> {
    return this.http.put<RefugeCenter>(`${this.apiBase}/${id}`, { ...refuge });
  }
  create(refuge: RefugeCenter): Observable<RefugeCenter> {
    return this.http.post<RefugeCenter>(`${this.apiBase}`, { ...refuge });
  }
  searchForLocation(location: string): Observable<any> {
    return this.http.get(`${this.apiBase}/search/${location}`);
  }
}
