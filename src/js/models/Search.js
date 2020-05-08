import axios from 'axios';

export default class Search{
     constructor(query){
           this.query=query;
     }

     async getResults(){

      try{
        const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
          this.recipesResult=result.data.recipes;
          console.log(this.recipesResult);
      }
      catch(e){
          console.log(e);
      }
     
    }

}

               