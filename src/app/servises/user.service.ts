import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/interfaces";


@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {

  }

  getUserByToken(): Observable<any> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Accept', 'application/json')

    // console.log(headers.get('Authorization'))

    return this.http.get<any>('https://1506815-cq40245.tw1.ru/user/current', { headers: headers }) // Путь бека
  }

  updateUser(user_id: any, name: string, surname: string, city: string, phone: string,): Observable<User> {

    const fd = new FormData()
    return this.http.post<User>('https://1506815-cq40245.tw1.ru/user/settings', fd) // Путь бека
  }

  report(name: string, city: string, address: string, price: string, email: string, user_name: string): Observable<any> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

    const data = {
      name: name,
      city: city,
      address: address,
      price: price,
      email: email,
      user_name: user_name
    }

    return this.http.post<any>('https://1506815-cq40245.tw1.ru/report/dashboard', data, { headers: headers })
  }

  editRole(role_id: number): Observable<User> {
    const token = localStorage.getItem('auth-token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams();
    params = params.set('role_id', role_id);

    const options = { params, headers };

    return this.http.post<any>('https://1506815-cq40245.tw1.ru/user/role', null, options)
  }
}
