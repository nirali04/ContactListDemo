import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';
import { AddEditContactComponent } from '../add-edit-contact/add-edit-contact.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})

export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['img', 'name', 'email'];
  dataSource: any[];

  constructor(public dialog: MatDialog, private apiService: SharedService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.apiService.GetUsers(2).subscribe((data:any) => {
      console.log('data', data.data)
      this.dataSource = data.data;
    });
  }

    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!!filterValue) {
      let filterData = this.dataSource.filter(x => x.first_name.includes(filterValue) || x.last_name.includes(filterValue));
      this.dataSource = filterData;
    } else {
      this.getUserList();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditContactComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.getUserList();
    });
  }

  
}
