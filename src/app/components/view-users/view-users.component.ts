import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'view_users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  search = "";
  constructor(private userService: UserService, private modalService: NgbModal,private snackBar: MatSnackBar) { }
  data: any;
  user: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    
  }

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
  userEdit = {
    user_id: "",
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

  ngOnInit(): void {


    this.userService.allUser().subscribe(
      response => {
        console.log(response)
        this.data = response;
      },
      error => {
        console.log(error)
      }
    )

  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(
      response => {
        this.userService.allUser().subscribe(
          response => {
            console.log(response)
            this.data = response;
          },
          error => {
            console.log(error)
          }
        )
      },
      error => {
        console.log(error)
      }


    )
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:"static" }).result.then((result) => {
    });
  }


  userById(id: number, content: any) {
    this.userService.userById(id).subscribe(
      response => {
        console.log(response)
        this.user = response;
        this.open(content);
      },
      error => {
        console.log(error)
      }
    )
  }
  updateUser() {
    this.userEdit.user_id = this.user.result.success.user_id
    this.userEdit.first_name = this.user.result.success.first_name
    this.userEdit.middle_name = this.user.result.success.middle_name
    this.userEdit.last_name = this.user.result.success.last_name
    this.userEdit.email = this.user.result.success.email
    this.userEdit.doj = this.user.result.success.doj
    this.userEdit.dob = this.user.result.success.dob
    this.userEdit.mobile_no = this.user.result.success.mobile_no
    this.userEdit.city = this.user.result.success.city
    this.userEdit.state = this.user.result.success.state
    this.userEdit.country = this.user.result.success.country
    this.userEdit.pincode = this.user.result.success.pincode
    this.userEdit.gender = this.user.result.success.gender


    this.userService.updateUser(this.userEdit).subscribe(
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
          
        }else
        {
        
        this.ngOnInit();
        this.modalService.dismissAll();
        Swal.fire(
          'Success!',
          'User Updated Successfully!',
          'success'
        )
      }},
      error => {
        console.log(error)
      }
    )
  }

  OrderByDoj() {

    this.userService.userByDoj().subscribe(
      response => {
        console.log(response)
        this.data = response;
      },
      error => {
        console.log(error)
      }
    )
  }
  OrderByDob() {

    this.userService.userByDob().subscribe(
      response => {
        console.log(response)
        this.data = response;
      },
      error => {
        console.log(error)
      }
    )
  }
  OrderByDobAndDoj() {

    this.userService.userByDobAndDoj().subscribe(
      response => {
        console.log(response)
        this.data = response;
      },
      error => {
        console.log(error)
      }
    )
  }
  filter() {
    if (this.search == "") {
      this.ngOnInit()
    } else {
      this.userService.filter(this.search).subscribe(
        response => {
          console.log(response)
          this.data = response;
        },
        error => {
          console.log(error)
        }
      )
    }

  }
  clear()
  {
    this.errors =
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
  }
}