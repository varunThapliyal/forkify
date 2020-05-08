import axios from 'axios';



export default class Recipe {
          
      constructor(id){
          this.id=id;
      }

      async getSpecificRecipe(){
          try{
             const rec=await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
             this.title=rec.data.recipe.title;
             this.author=rec.data.recipe.publisher,
             this.image=rec.data.recipe.image_url,
             this.url=rec.data.recipe.source_url,
             this.ingredients=rec.data.recipe.ingredients
          }
          catch(e){
              console.log(e);
          }
      }
      calcTime(){
          const numIngredients = this.ingredients.length;
          const totalIng = Math.ceil(numIngredients/3);
          this.time = totalIng * 15;

      }
      calcServings(){
          this.servings=4;
      }

      parseIngredients(){

              const longUnits=['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
              const shortUnits=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
              
              const newIngredients=this.ingredients.map((ing)=>{
                     let ingredient=ing.toLowerCase();
                    
                     longUnits.forEach((longunit,i)=>{
                             ingredient= ingredient.replace(longunit,shortUnits[i]) 
                     })
                     ingredient=ingredient.replace(/ *\([^)]*\) */g,' ');
                     

                     const arrIng=ingredient.split(' ');
                     
                     
                     const unitIndex=arrIng.findIndex(word=>shortUnits.includes(word));
                     
                     
                     let objIng;

                     if(unitIndex > -1){
                         
                            const arrCount=arrIng.slice(0,unitIndex);
                            let count;
                           if(arrCount.length===1){
                                count=eval(arrIng[0].replace('-','+'));
                            
                           }
                           else{
                               count=eval(arrCount.join('+'));
                               
                               
                           }

                           objIng= {
                               count,
                               unit:arrIng[unitIndex],
                               ingredient:arrIng.slice(unitIndex+1).join(' ')
                           }
                           
                     }
                     else{
                        if(parseInt(arrIng[0],10)){
                            objIng={
                                count:parseInt(arrIng[0],10),
                                unit:"",
                                ingredient:arrIng.slice(1).join(' ')
                            }
                        }
                        else if(unitIndex===-1){
                          objIng={
                              count:1,
                              unit:"",
                              ingredient
                          }
                        }
                     }
                    

                    
                 return objIng;
              })

            this.ingredients=newIngredients;
            


      }

      updateServings(type){
        const newServings= type ==='dec'?this.servings-1:this.servings+1;

        this.ingredients.forEach((ingredient)=>{
              ingredient.count *= (newServings/this.servings);

        })

        this.servings=newServings;
        console.log(this.servings);
      }

}