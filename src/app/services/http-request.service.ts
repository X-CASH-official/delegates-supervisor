import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable()
export class httpdataservice{
constructor(private httpClient: HttpClient) {}

SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS:string = "http://delegates.xcash.foundation/getdelegatesstatistics";
SERVER_HOSTNAME_AND_PORT_GET_DELEGATE_WEBSITE_STATISTICS:string = "http://delegates.xcash.foundation/delegateswebsitegetstatistics";
XCASH_WALLET_DECIMAL_PLACES_AMOUNT:number = 1000000;
BLOCK_TIME:number = 5;

Timer:any;

get_request(url:string)
{
return this.httpClient.get(url);
}

post_request(url:string, data:string)
{
const headers = new HttpHeaders ({'Content-Type':'application/x-www-form-urlencoded'});
return this.httpClient.post(url,data, {headers: headers});
}

post_request_json(item: any[])
{
const headers = new HttpHeaders ({'Content-Type':'application/json'});
return this.httpClient.post('url',item, {headers: headers});
}

}
