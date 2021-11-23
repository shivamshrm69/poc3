import { Component, OnInit } from '@angular/core';
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
  constructor(private userService: UserService, private modalService: NgbModal) { }
  data: any;
  user: any;
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
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
        this.ngOnInit();
        this.modalService.dismissAll();
        Swal.fire(
          'Success!',
          'User Updated Successfully!',
          'success'
        )
      },
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
}