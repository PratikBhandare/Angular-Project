import { AbstractControl, FormControl } from "@angular/forms";
 
 
export class spaceValidator{
    static validator(controlName : AbstractControl){
        if(controlName.value != null && controlName.value.split(' ').length > 1 ){
            console.log(controlName.value.split(' '));
           
            return {noSpaceAllowed:true}
        }
       
 
        return {noSpaceAllowed:null}
    }
         
}