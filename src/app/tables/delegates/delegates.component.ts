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
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text_settings: 20, text: 'false', settings: false, title: 'ONLINE STATUS', icon: 'online_prediction' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'DELEGATE RANK ', icon: 'leaderboard' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'BLOCKS FOUND ', icon: 'find_in_page' }
    ];
  public dashCard2 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'ONLINE PERCENTAGE', icon: 'update' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'EST ROUNDS BTW HITS ', icon: 'published_with_changes' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'HOURS SINCE LAST FINDING', icon: 'alarm_on' }
    ];
	public  dashCard3 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'VERIFIERS ONLINE ROUNDS', icon: 'model_training' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'VERIFIER ROUNDS', icon: 'autorenew' },
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'PRODUCER ROUNDS', icon: 'find_replace' }
    ];
  public dashCard4 = [
        { colorDark: '#fa741c', colorLight: '#fb934e', width: 40, text: 0, settings: true, title: 'VOTE COUNT', icon: 'done_all' },
    ];


  public displayedColumns = ['id', 'block_height', 'block_hash', 'block_date_and_time', 'block_reward'];
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
      this.title = `${data.delegate_name}`;
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
      this.dashCard1[0].text = (data.online_status).toUpperCase();
      this.dashCard1[1].text = parseInt(data.current_delegate_rank);
      this.dashCard1[2].text = block_producer_block_heights.length-1;

      this.dashCard2[0].text = parseInt(data.block_verifier_online_percentage);
      this.dashCard2[1].text = parseInt(data.block_verifier_total_rounds) / block_producer_block_heights.length;

      this.dashCard3[0].text = parseInt(data.block_verifier_online_total_rounds);
      this.dashCard3[1].text = parseInt(data.block_verifier_total_rounds);
      this.dashCard3[2].text = parseInt(data.block_producer_total_rounds);

      this.dashCard4[0].text = parseInt(data.total_vote_count) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT;

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
      this.dashCard2[2].text = ((parseInt(data.current_block_height) - this.last_block_found) * this.httpdataservice.BLOCK_TIME) / 60;
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
