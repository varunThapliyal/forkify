import * as SearchView from './views/searchView';
import * as ListView from './views/listView';
import * as LikeView from './views/likesView';


import {elements,renderLoader,clearLoader} from './views/base';
import Recipe from './models/Recipe';
import Search from './models/Search';
import Likes from './models/Likes';

import {renderRecipe,clearRecipe,updateServingsIngredients} from './views/recipeView';
import List from './models/List';


// Global app controller


const state={

};


const controlSearch= async () =>{
        const query=SearchView.getInput();
        if(query){
            state.search=new Search(query);

            SearchView.clearInput();
            SearchView.clearPreviousResults();


            renderLoader(elements.resultDiv);
            await state.search.getResults();
            clearLoader();
            
            SearchView.renderRecipes(state.search.recipesResult);
        }

        


}

          


elements.searchSubmit.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    controlSearch();

})

elements.resultPages.addEventListener('click',(e)=>{
     
   const btn = e.target.closest('.btn-inline');
   if(btn){
       const goToPage=parseInt(btn.dataset.goto,10);
       SearchView.clearPreviousResults();
       SearchView.renderRecipes(state.search.recipesResult,goToPage)
   }
})


  const controlRecipeSearch=async () => {
               const id=window.location.hash.replace('#','');

               if(id){
                clearRecipe();
                renderLoader(elements.recipe);
                if(state.search){
                SearchView.highlightID(id);
                }

                state.getrecipe=new Recipe(id);
               


                await state.getrecipe.getSpecificRecipe();
                state.getrecipe.parseIngredients();
                state.getrecipe.calcTime();
                state.getrecipe.calcServings();

                

                renderRecipe(state.getrecipe,state.likes.isLiked(id)); 
                clearLoader();
               }
  }

window.addEventListener('hashchange',controlRecipeSearch);
window.addEventListener('load',controlRecipeSearch);




const controlList = ()=>{
    if(!state.list){
        state.list=new List()
    };

          state.getrecipe.ingredients.forEach((ing)=>{

                    const item=state.list.addItem(ing.count,ing.unit,ing.ingredient);
                    ListView.renderList(item);
          })
}

state.likes=new Likes();

const controlLikes = ()=>{
      if(!state.likes) state.likes=new Likes();
      
      const currentId = state.getrecipe.id;
                const ans=state.likes.isLiked();
                
      if(!state.likes.isLiked(currentId)){
          const addLike=state.likes.addLikes(
              currentId,
              state.getrecipe.title,
              state.getrecipe.author,
              state.getrecipe.image       
          );
         LikeView.toggleLike(true);
         
         LikeView.renderLikedList(addLike);
      }
      else{
          
          state.likes.deleteLike(currentId);
         LikeView.toggleLike(false);
         LikeView.deleteLikeList(currentId);


      }
LikeView.toggleLikeMenu(state.likes.getNumLikes());

      
}

elements.recipe.addEventListener('click',(e)=>{
        
      if(e.target.matches('.btn-decrease, .btn-decrease *')){
          if(state.getrecipe.servings>1)
          state.getrecipe.updateServings('dec');
          updateServingsIngredients(state.getrecipe);

          
      }
      else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.getrecipe.updateServings('inc');
        updateServingsIngredients(state.getrecipe);
    }
    else if(e.target.matches('.recipe__btn--add', '.recipe__btn--add *')){
        controlList();
    }
    else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLikes();
    }
     
})