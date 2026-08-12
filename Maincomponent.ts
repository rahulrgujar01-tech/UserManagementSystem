import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { LogOut } from "./Application/Auth/LogOut";

// Ye LAYOUT component hai — navbar + sidebar. Login ke baad '/main' route par
// ye load hota hai, aur iske andar wala <router-outlet> Dashboard/User/Lead/Employee dikhata hai.
@Component({
    selector: "app-main-layout",
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: "./Maincomponent.html",
})
export class MainClass {
    username: string = localStorage.getItem('username') || '';

    private router = inject(Router);
    private logoutUsecase = inject(LogOut);

    logout(): void {
        this.logoutUsecase.execute();   // token + username localStorage se clear karta hai
        this.router.navigate(['/login']);
    }
}
