/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SupportResponse } from '../../models/support-response';

export interface GetResponsesByRefugeeSupport$Params {
  refugeeSupportId: number;
}

export function getResponsesByRefugeeSupport(http: HttpClient, rootUrl: string, params: GetResponsesByRefugeeSupport$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SupportResponse>>> {
  const rb = new RequestBuilder(rootUrl, getResponsesByRefugeeSupport.PATH, 'get');
  if (params) {
    rb.path('refugeeSupportId', params.refugeeSupportId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<SupportResponse>>;
    })
  );
}

getResponsesByRefugeeSupport.PATH = '/api/support-responses/refugee/{refugeeSupportId}';
