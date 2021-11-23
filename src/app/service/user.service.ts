import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl:string="http://localhost:8097/poc"
  constructor(private http:HttpClient) { }
  addUser(user:any)
  {
   
   return this.http.post(this.baseUrl+'/registration',user)
  }

  allUser()
  {
   
   return this.http.get(this.baseUrl+'/allUsers')
  }
  userByDoj()
  {
   
   return this.http.get(this.baseUrl+'/usersOrderByDoj')
  }
  userByDob()
  {
   
   return this.http.get(this.baseUrl+'/usersOrderByDob')
  }
  userByDobAndDoj()
  {
   
   return this.http.get(this.baseUrl+'/userOrderByDobAndDoj')
  }

  deleteUser(id:number)
  {
   return this.http.post(this.baseUrl+'/hardDeleteUser/'+id,"")
  }
  updateUser(user:any)
  {
   return this.http.put(this.baseUrl+'/userEdit',user)
  }
  userById(id:Number)
  {
   return this.http.get(this.baseUrl+'/userById/'+id)
  }
  filter(value:any)
  {
    return this.http.get(this.baseUrl+'/searchFilter/'+value)
    
  }
}
