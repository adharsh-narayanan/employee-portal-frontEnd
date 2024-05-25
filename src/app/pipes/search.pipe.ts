import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
//transform function will convert the input data into new data/format
//1st argument data to be transformed
//2nd based on which transformation has to be done
  transform(allEmployees:any[],searchKey:string): any[] {
   const result:any=[];
   //if nothing present
   if(!allEmployees || !searchKey){
    return allEmployees
   }
   //if data is present
   allEmployees.forEach((item)=>{
    //trim()-to remove white space
    //toLowerCase()-to convert into lowercase
    //includes()-returns boolean
    if(item.username.trim().toLowerCase().includes(searchKey.trim().toLowerCase())){
      result.push(item)
    }
   })
   return result
  }

}
