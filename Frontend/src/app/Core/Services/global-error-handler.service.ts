import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private messageService:MessageService) { }

  handleError(error: any): void {
    console.log("Frontend Error:",error);
    if(error instanceof HttpErrorResponse){
      if(error.status===409){
        console.log("alredy registerd error..");
        // alert()
        
        this.messageService.add({severity:"error", summary:"error",detail:"Email is Alredy Registered...!"})
      return
      }
      this.messageService.add({severity:"error", summary:"error",detail:``})
      // alert()

      return
    }
    
    this.messageService.add({severity:"error", summary:"error",detail:"Something went Wrong...!"})
    
    
  }
}
