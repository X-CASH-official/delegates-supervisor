import { async, TestBed, inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {httpdataservice} from 'app/services/http-request.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('httpdataservice', () => {
  let service: httpdataservice;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ httpdataservice ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.get(httpdataservice);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test GET request',inject([HttpTestingController, httpdataservice],(httpMock: HttpTestingController, httpdataservice: httpdataservice) => {
   httpdataservice.get_request(httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS).subscribe((event: HttpEvent<any>) => {
     switch (event.type) {
       case HttpEventType.Response:
          }
        });

        const mockReq = httpMock.match(httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS);
         expect(mockReq.slice(-1)[0].cancelled).toBeFalsy();
         expect(mockReq.slice(-1)[0].request.method).toBe('GET');
         expect(mockReq.slice(-1)[0].request.responseType).toEqual('json');
         mockReq.slice(-1)[0].flush(1);

        httpMock.verify();
  }));

  it('Test POST request',inject([HttpTestingController, httpdataservice],(httpMock: HttpTestingController, httpdataservice: httpdataservice) => {
   httpdataservice.post_request(httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS,"DATA").subscribe((event: HttpEvent<any>) => {
     switch (event.type) {
       case HttpEventType.Response:
          }
        });

        const mockReq = httpMock.match(httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS);
         expect(mockReq.slice(-1)[0].cancelled).toBeFalsy();
         expect(mockReq.slice(-1)[0].request.method).toBe('POST');
         expect(mockReq.slice(-1)[0].request.responseType).toEqual('json');
         mockReq.slice(-1)[0].flush(1);

        httpMock.verify();
  }));

});
