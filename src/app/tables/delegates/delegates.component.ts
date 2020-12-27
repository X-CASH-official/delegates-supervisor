import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import { HttpdataService } from 'app/services/http-request.service';
import { public_address } from 'app/services/public_address.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { FunctionsService } from '../../services/functions.service';

import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-fixed-table',
  templateUrl: './delegates.component.html',
  styleUrls: ['./delegates.component.scss']
})

export class delegatesComponent implements OnInit {

  public dashCard1 = [
    { ogmeter: false, width_icon: 25, text_size: 36, text: '-', suffix: '',  title: 'ONLINE STATUS', icon: 'online_prediction' },
    { ogmeter: true, width_icon: 25, text_size: 40, text: 0, suffix: '',  title: 'DELEGATE RANK ', icon: 'leaderboard' },
    { ogmeter: true, width_icon: 25, text_size: 40, text: 0, suffix: '',  title: 'BLOCKS PRODUCED ', icon: 'find_in_page' },
    { ogmeter: false, width_icon: 25, text_size: 40, text: '-', suffix: '',  title: 'VOTE COUNT', icon: 'done_all' },
    { ogmeter: true, width_icon: 25, text_size: 40, text: 0, suffix: '%',  title: 'ONLINE PERCENTAGE', icon: 'update' },
    { ogmeter: true, width_icon: 25, text_size: 40, text: 0, suffix: '',  title: 'VERIFIERS ONLINE ROUNDS', icon: 'model_training' },
    { ogmeter: true, width_icon: 25, text_size: 40, text: 0, suffix: '',  title: 'VERIFIER ROUNDS', icon: 'autorenew' },
    { ogmeter: true, width_icon: 25, text_size: 40, text: 0, suffix: '',  title: 'VERIFIER SCORE', icon: 'military_tech' },
    { ogmeter: true, width_icon: 25, text_size: 40, text: 0, suffix: '%',  title: 'PRODUCER/VERIFIER RATIO', icon: 'star_half' },
    { ogmeter: true, width_icon: 25, text_size: 40, text: 0, suffix: '',  title: 'EST ROUNDS BTW BLOCK PRODUCER ', icon: 'published_with_changes' },
    { ogmeter: false, width_icon: 25, text_size: 40, text: '-', suffix: '',  title: 'SINCE LAST BLOCK PRODUCED', icon: 'alarm_on' }
  ];

  public displayedColumns = ['id', 'block_height'];
	public exampleDatabase = new ExampleDatabase();
	public dataSource: ExampleDataSource | null;
	public showFilterTableCode;
  delegates_data:string = "";
  last_block_found:number;
  title:string;
  about:string;
  website:string;
  team:string;
  server_specs:string;
  shared_delegate_status:string;
  delegate_fee:number;
  length;

	constructor(private httpdataservice: HttpdataService, private public_address: public_address, public functionsService: FunctionsService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild('filter') filter: ElementRef;


  get_delegates_statistics()
  {
    this.httpdataservice.get_request(this.httpdataservice.GET_DELEGATES_STATISTICS + "?parameter1=" + this.public_address.PUBLIC_ADDRESS).subscribe(
      (res) =>
      {
        this.exampleDatabase = new ExampleDatabase();
        var data = JSON.parse(JSON.stringify(res));
        this.title = `${data.delegate_name}`;
        var block_producer_block_heights = data.block_producer_block_heights.split("|");
        var count;

        for (count = 1; count < block_producer_block_heights.length; count++) {
          this.exampleDatabase.addUser((count).toString(),block_producer_block_heights[count].toString(),"Block Producer");
          if (count + 1 == block_producer_block_heights.length)  {
            this.last_block_found = parseInt(block_producer_block_heights[count]);
          }
        }
        this.about = data.about;
        this.website = data.website;
        this.team = data.team;
        this.server_specs = data.server_specs;
        this.shared_delegate_status = data.shared_delegate_status == 'true' ? 'Shared'  : 'Solo';
        this.delegate_fee = data.delegate_fee;


        this.dashCard1[0].text = data.online_status == 'true' ? 'Online'  : 'Offline';
        this.dashCard1[1].text = parseInt(data.current_delegate_rank);
        this.dashCard1[2].text = block_producer_block_heights.length-1;
        this.dashCard1[3].text = this.functionsService.get_lg_numer_format(parseInt(data.total_vote_count) / this.httpdataservice.XCASH_WALLET_DECIMAL_PLACES_AMOUNT);

        this.dashCard1[4].text = parseInt(data.block_verifier_online_percentage);
        this.dashCard1[5].text = parseInt(data.block_verifier_online_total_rounds);
        this.dashCard1[6].text = parseInt(data.block_verifier_total_rounds);
        this.dashCard1[7].text = parseInt(data.block_verifier_score);

        this.dashCard1[8].text = parseInt(data.block_producer_total_rounds) / parseInt(data.block_verifier_total_rounds) * 100;
        this.dashCard1[9].text = data.block_producer_total_rounds > 0 ? parseInt(data.block_verifier_total_rounds) / parseInt(data.block_producer_total_rounds) : "0";

        this.length = block_producer_block_heights.length - 1;
        this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
      },
      (error) => {
        Swal.fire("Error","An error has occured.<br />Get delegates statistics failed.","error");
      }
    );
  }

  get_delegates_website_statistics()
  {
    this.httpdataservice.get_request(this.httpdataservice.GET_DELEGATE_WEBSITE_STATISTICS).subscribe(
    (res) =>
    {
      var data = JSON.parse(JSON.stringify(res));
      if (this.last_block_found) {
        var minutes_since_last_block_found = ((parseInt(data.current_block_height) - this.last_block_found) * this.httpdataservice.BLOCK_TIME);
        var minutes = minutes_since_last_block_found % 60;
        var hours = (minutes_since_last_block_found-minutes) / 60;
        this.dashCard1[10].text =  "~" + hours.toString() + "h " + (minutes<10?"0":"") + minutes.toString() + "m";
      }else{
        this.dashCard1[10].text =  "∞";
      }
    },
    (error) => {
      Swal.fire("Error","An error has occured.<br />Get delegates website statistics failed.","error");
    });
  }

  ngOnInit()
  {
    this.get_delegates_statistics();
    this.get_delegates_website_statistics();
  }

}
