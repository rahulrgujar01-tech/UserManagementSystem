import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { TokenService } from "../Services/TokenService";

// Ye interceptor har outgoing HTTP request me (agar token available hai)
// "Authorization: Bearer <token>" header automatically laga deta hai,
// taaki login ke bina protected APIs backend se bhi call na ho paayein.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);
    const token = tokenService.getAccessToken();

    if (token) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(cloned);
    }

    return next(req);
};
