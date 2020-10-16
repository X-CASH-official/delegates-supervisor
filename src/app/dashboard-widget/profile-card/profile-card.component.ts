import { Component, OnInit, Input } from '@angular/core';
import {HttpdataService} from '../../services/http-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cdk-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

    @Input() title: string;
    @Input() settings: object;
    @Input() data_settings: object;
    @Input() text_settings: object;
    @Input() data: string;
    @Input() button_name: string;
    @Input() button_length: string;
    @Input() button_click: string;

    about:string;
    website:string;
    team:string;
    shared_delegate_status:string;
    delegate_fee:string;
    server_specs:string;
    public_address:string;

    width:number = 0;

    public bio =true;
    public skill;
    public proj;
    constructor(private HttpdataService: HttpdataService) { }

   copyMessage(val: string, text:string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    Swal.fire("Success",text,"success");
  }

    ngOnInit() {
    }

}
