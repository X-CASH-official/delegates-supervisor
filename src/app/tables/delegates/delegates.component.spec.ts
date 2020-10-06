import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ExampleDatabase, ExampleDataSource } from './helpers.data';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {httpdataservice} from 'app/services/http-request.service';
import {public_address} from 'app/services/public_address.service';
import { delegatesComponent } from './delegates.component';

describe('delegatesComponent', () => {
  let component: delegatesComponent;
  let fixture: ComponentFixture<delegatesComponent>;

  let test_data: any[] = [
    { id: "1", block_height: '100' },
    { id: "2", block_height: '100' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ delegatesComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule,MatTableModule],
      providers: [ httpdataservice, public_address ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(delegatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // check that all html components are created
  it('should create', () => expect(component).toBeTruthy());

  it('should create dash card five', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1')).toBeTruthy());
  it('should set dash card fives title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.title).toBe('ONLINE STATUS'));
  it('should set dash card fives property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard1').dashData.text).toBe(''));

  it('should create dash card two', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2')).toBeTruthy());
  it('should set dash card twos title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.title).toBe('DELEGATE RANK'));
  it('should set dash card twos property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard2').dashData.text).toBe(0));

  it('should create dash card eight', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3')).toBeTruthy());
  it('should set dash card eights title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.title).toBe('BLOCKS FOUND'));
  it('should set dash card eights property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard3').dashData.text).toBe(0));

  it('should create dash card six', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4')).toBeTruthy());
  it('should set dash card sixs title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.title).toBe('ONLINE PERCENTAGE'));
  it('should set dash card sixs property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard4').dashData.text).toBe(0));

  it('should create dash card nine', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard5')).toBeTruthy());
  it('should set dash card nines title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard5').dashData.title).toBe('EST ROUNDS BTW HITS'));
  it('should set dash card nines property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard5').dashData.text).toBe(0));

  it('should create dash card ten', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard6')).toBeTruthy());
  it('should set dash card tens title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard6').dashData.title).toBe('HOURS SINCE LAST FINDING'));
  it('should set dash card tens property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard6').dashData.text).toBe(0));

  it('should create dash card four', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard7')).toBeTruthy());
  it('should set dash card fours title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard7').dashData.title).toBe('VERIFIERS ONLINE ROUNDS'));
  it('should set dash card fours property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard7').dashData.text).toBe(0));

  it('should create dash card three', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard8')).toBeTruthy());
  it('should set dash card threes title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard8').dashData.title).toBe('VERIFIER ROUNDS'));
  it('should set dash card threes property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard8').dashData.text).toBe(0));

  it('should create dash card seven', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard9')).toBeTruthy());
  it('should set dash card sevens title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard9').dashData.title).toBe('PRODUCER ROUNDS'));
  it('should set dash card sevens property to a string', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard9').dashData.text).toBe(0));

  it('should create dash card one', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard10')).toBeTruthy());
  it('should set dash card ones title', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard10').dashData.title).toBe('VOTE COUNT'));
  it('should set dash card ones property to a number', () => expect(fixture.debugElement.nativeElement.querySelector('#dashcard10').dashData.text).toBe(0));

  it('should create delegates table', () => expect(fixture.debugElement.nativeElement.querySelector('#blocks_table')).toBeTruthy());

  // test the code
  it('should update blocks table', () => {
    component.exampleDatabase = new ExampleDatabase();
    test_data.forEach((item) => component.exampleDatabase.addUser(item.id,item.block_height));
    component.dataSource = new ExampleDataSource(component.exampleDatabase);

    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#id1').textContent).toContain(test_data[0].id);
    expect(fixture.debugElement.nativeElement.querySelector('#blockheight1').textContent).toContain(test_data[0].block_height);

    expect(fixture.debugElement.nativeElement.querySelector('#id2').textContent).toContain(test_data[1].id);
    expect(fixture.debugElement.nativeElement.querySelector('#blockheight2').textContent).toContain(test_data[1].block_height);
    });

});
