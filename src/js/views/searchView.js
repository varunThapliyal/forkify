import {elements} from './base';


           export const highlightID =(id)=>{

            const resultsArr = Array.from(document.querySelectorAll('.results__link'));
            resultsArr.forEach(el => {
                el.classList.remove('results__link--active');
            });
            document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
           }

           export const getInput = () => elements.searchInput.value;

           export const clearInput =  ()=>{
                elements.searchInput.value='';
           }
           export const clearPreviousResults = ()=>{
               elements.resultsList.innerHTML='';
               elements.resultPages.innerHTML='';
           }


           const limitRecipeTitle = (title)=>{
               
               const newTitle=[];
              if(title.length>17){
                        title.split(' ').reduce((acc,currWord)=>{
                        if(acc+currWord.length <= 17){
                          newTitle.push(currWord);
                        }
                        return acc+currWord.length;
                    },0)
                   return `${newTitle.join(' ')}...`;
              }
              return title;

           }

           const renderRecipe = (recipe)=>{
            const markup=`<li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;
        elements.resultsList.insertAdjacentHTML('beforeend',markup);
    }
         

   const createPageButton = (page,type) =>`
       <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
       <span>Page ${type === 'prev' ? page-1 : page+1 }</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right' }"></use>
          </svg>
      </button>`;
   

      

   const renderButtons= (page,resPerPage,numResults) => {
    const Pages=Math.ceil(numResults/resPerPage);
    
    let button;
     if(page===1 && Pages>1 ){
            button=createPageButton(page,'next');
     }
     else if(page<Pages){
            button=`${createPageButton(page,'next')}
                ${createPageButton(page,'prev') }`;
     }
     else if(page===Pages && Pages>1){
             button=createPageButton(page,'prev');
     }

   elements.resultPages.insertAdjacentHTML('afterbegin',button);
     
}


           
           export const renderRecipes = (recipes,page=1,resPerPage=10) => {
               const start=(page-1)*resPerPage;
               const end=page*resPerPage;
               recipes.slice(start,end).forEach(recipe => {
                    renderRecipe(recipe);
               });

               renderButtons(page,resPerPage,recipes.length);

           }



        