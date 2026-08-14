import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { routes } from "./UserRoutes";

import { AuthRepository } from "./Domain/Repositories/Authrepositories";
import { AuthRepositoryImpl } from "./Infrastructure/Repositories/Authrepositoriesimple";
import { AccountRepository } from "./Domain/Repositories/Accountrepositories";
import { AccountRepositoryImpl } from "./Infrastructure/Repositories/Accountrepositoriesimple";
import { authInterceptor } from "./Core/interceptors/AuthInterceptors";
import { EnquiryRepositoriesimple } from "./Infrastructure/Repositories/Enquiryrepositoriesimple";
import { TrainingCourseRepositorySimple } from "./Infrastructure/Repositories/Trainingcourserepositoriesimpl";

import { TRAINING_COURSE_REPOSITORY } from "./Domain/Repositories/Token/trainingcourserepositorytoken";
import { ENQUIRY_FOLOWUP_REPOSITORY } from "./Domain/Repositories/Token/enquiryfollowuprepositoriestoken";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),

        // authInterceptor har request me login token attach karega
        provideHttpClient(withInterceptors([authInterceptor])),

        // Abstract repository -> concrete implementation mapping
        // (Angular ko batana padta hai ki jab AuthRepository maanga jaye to AuthRepositoryImpl do)
        { provide: AuthRepository, useClass: AuthRepositoryImpl },
        { provide: AccountRepository, useClass: AccountRepositoryImpl },
        { provide: ENQUIRY_FOLOWUP_REPOSITORY, useClass: EnquiryRepositoriesimple},
        { provide: TRAINING_COURSE_REPOSITORY ,useClass: TrainingCourseRepositorySimple}
    ]
};
