import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Lead } from "../../Domain/Entities/Lead";

@Injectable({
    providedIn:'root'
})
export class LeadApi {
    private http = inject(HttpClient);
    private readonly apiurl = 'https://leadapis.ciitstudent.com/api/Lead';

    getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiurl);
    }
    getLeadById(id: number):Observable<Lead>{
        return this.http.get<Lead>(`${this.apiurl}/${id}`);
    }
    createLead(lead: Lead): Observable<Lead> {
        return this.http.post<Lead>(this.apiurl, lead);
    }
    updateLead(id: number, lead: Lead): Observable<Lead> {
        return this.http.put<Lead>(`${this.apiurl}/${id}`, lead);
    }
     deleteLead(id: number): Observable<any> {
        return this.http.delete(`${this.apiurl}/${id}`);
    }
    restoreLead(id: number): Observable<void> {
        return this.http.put<void>(
            `${this.apiurl}/restore/${id}`,
           {}
        );
    }

}