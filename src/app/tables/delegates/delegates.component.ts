import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import {httpdataservice} from 'app/services/http-request.service';
import {public_address} from 'app/services/public_address.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './delegates.component.html',
  styleUrls: ['./delegates.component.scss']
})
export class delegatesComponent implements OnInit {
        public dashCard1 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'TOTAL VOTE COUNT', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'CURRENT DELEGATE RANK', icon: 'cloud' }
    ];
	public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCK VERIFIER TOTAL ROUNDS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCK VERIFIERS ONLINE TOTAL ROUNDS', icon: 'cloud' }
    ];
        public dashCard3 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text_settings: 20, text: '', settings: false, title: 'ONLINE STATUS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCK VERIFIER ONLINE PERCENTAGE', icon: 'cloud' }
    ];
	public dashCard4 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCK PRODUCER TOTAL ROUNDS', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text_settings: 20, text: 0, settings: true, title: 'TOTAL BLOCKS', icon: 'cloud' }
    ];
   	public dashCard5 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'AVERAGE', icon: 'cloud' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text_settings: 20, text: 0, settings: true, title: 'ESTIMATED TIME SINCE LAST BLOCK FOUND (IN HOURS)', icon: 'cloud' }
    ];
	public displayedColumns = ['ID', 'Block_Height'];
	public exampleDatabase = new ExampleDatabase();
	public dataSource: ExampleDataSource | null;
  	public showFilterTableCode;
        delegates_data:string = "";
        last_block_found:number;
        title:string;
  	constructor(private httpdataservice: httpdataservice, private public_address: public_address) { }

get_delegates_statistics()
{
  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATES_STATISTICS + "?parameter1=" + this.public_address.PUBLIC_ADDRESS).subscribe(
  (res) =>
  {
    this.exampleDatabase = new ExampleDatabase();
    var data = JSON.parse(JSON.stringify(res));
    this.title = `Statistics for ${data.delegate_name}`;
    var block_producer_block_heights = data.block_producer_block_heights.split("|");
    var count;
    for (count = 0; count < block_producer_block_heights.length; count++)
    {
      if (count == 0)
      {
        continue;
      }
      this.exampleDatabase.addUser((count).toString(),block_producer_block_heights[count].toString());
      if (count + 1 == block_producer_block_heights.length)
      {
        this.last_block_found = parseInt(block_producer_block_heights[count]);
      }
    }
    this.dashCard1[0].text = parseInt(data.total_vote_count) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;
    this.dashCard1[1].text = parseInt(data.current_delegate_rank);
    this.dashCard2[0].text = parseInt(data.block_verifier_total_rounds);
    this.dashCard2[1].text = parseInt(data.block_verifier_online_total_rounds);
    this.dashCard3[0].text = data.online_status;
    this.dashCard3[1].text = parseInt(data.block_verifier_online_percentage);
    this.dashCard4[0].text = parseInt(data.block_producer_total_rounds);
    this.dashCard4[1].text = block_producer_block_heights.length-1;
    this.dashCard5[0].text = parseInt(data.block_verifier_total_rounds) / block_producer_block_heights.length;
    this.dataSource = new ExampleDataSource(this.exampleDatabase);
    this.dataSource = new ExampleDataSource(this.exampleDatabase);
  },
  (error) => 
  {
    Swal.fire("Error","An error has occured","error");    
});
}

get_delegates_website_statistics()
{
  this.httpdataservice.get_request(this.httpdataservice.SERVER_HOSTNAME_AND_PORT_GET_DELEGATE_WEBSITE_STATISTICS).subscribe(
  (res) =>
  {
    var data = JSON.parse(JSON.stringify(res));
    this.dashCard5[1].text = ((parseInt(data.current_block_height) - this.last_block_found) * this.httpdataservice.BLOCK_TIME) / 60;
  },
  (error) => 
  {
    Swal.fire("Error","An error has occured","error");
  });
}

ngOnInit()
{
  this.get_delegates_statistics();
  this.get_delegates_website_statistics();
}

       
}
