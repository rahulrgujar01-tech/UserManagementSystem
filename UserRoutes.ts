//import { Routes } from "@angular/router";
import { Routes } from "@angular/router";
import { LoginClass } from "./Presentation/Account/Login/LoginComponent";
import { ForgotPasswordClass } from "./Presentation/Account/ForgotPassword/ForgotPasswordComponent";
import { ChangePasswordClass } from "./Presentation/Account/ChangePassword/ChangePasswordComponent";
import { DashboardComponent } from "./Presentation/Dashboard/DashboardComponent";
import { UserComponent } from "./Presentation/User/UserComponent";
import { LeadComponent } from "./Presentation/Lead/LeadComponent";
import { EmployeeComponent } from "./Presentation/Employee/EmployeeComponent";
import { MainClass } from "./Maincomponent"; 
import { authGuard } from "./Core/guards/AuthGuards";
import { Enquirylist } from "./Presentation/EnquiryFollowup/EnquiryFollowupList/EnquiryfollowupList";
import { Enquiryform } from "./Presentation/EnquiryFollowup/EnquiryFollowupFrom/EnquiryFollowupFrom";

export const routes: Routes = [
    // Public pages — login ke bina bhi khulenge
    { path: 'login', component: LoginClass },
    { path: 'forgot-password', component: ForgotPasswordClass },

    // Login ke baad "main" layout khulega (navbar + sidebar).
    // canActivate: [authGuard] -> agar token nahi hai to seedha /login par bhej dega,
    // aur ye check '/main' ke saare children (dashboard/user/lead/employee/change-password) par apply hota hai.
    {
        path: 'main',
        component: MainClass,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'user', component: UserComponent },
            { path: 'lead', component: LeadComponent },
            { path: 'employee', component: EmployeeComponent },
            { path: 'change-password', component: ChangePasswordClass },
            
            {path:'enquirylist', component:Enquirylist},
            { path: 'enquiry-followup/create',component: Enquiryform},
            {path: 'enquiry-followup/edit/:id',component: Enquiryform},
           // {path:'course', component:CourseClass},
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
