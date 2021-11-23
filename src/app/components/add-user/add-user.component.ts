import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'add_user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  data: any;
  errors =
    {
      city: "",
      country: "",
      email: "",
      first_name: "",
      middle_name: "",
      gender: "",
      last_name: "",
      dob: "",
      doj: "",
      mobile_no: "",
      pincode: "",
      state: ""
    }
  user = {
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    email: "",
    dob: "",
    doj: "",
    mobile_no: "",
    city: "",
    state: "",
    country: "",
    pincode: ""

  }
  constructor(private userService: UserService, private snackBar: MatSnackBar) { }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  ngOnInit(): void {
   
  }
  doSubmitForm() {
    this.userService.addUser(this.user).subscribe(
      response => {
        console.log(response)
        let res: any = response;

        if (res.success == false) {
          this.openSnackBar('Error', 'Ok');
          this.errors.last_name = res.result.error.last_name
          this.errors.first_name = res.result.error.first_name
          this.errors.middle_name = res.result.error.middle_name
          this.errors.city = res.result.error.city
          this.errors.country = res.result.error.country
          this.errors.state = res.result.error.state
          this.errors.pincode = res.result.error.pincode
          this.errors.gender = res.result.error.gender
          this.errors.mobile_no = res.result.error.mobile_no
          this.errors.doj = res.result.error.doj
          this.errors.dob = res.result.error.dob
          this.errors.email = res.result.error.email
        } else {
          this.openSnackBar('User Added', 'Done');
          this.user={
            first_name: "",
            middle_name: "",
            last_name: "",
            gender: "",
            email: "",
            dob: "",
            doj: "",
            mobile_no: "",
            city: "",
            state: "",
            country: "",
            pincode: ""
        
          }
        }

      },
      error => {
        console.log(error)
      }
    )
  }

  allUsers() {
alert("called")
  }
}
