export const elements={
    searchInput:document.querySelector('.search__field'),
    searchSubmit:document.querySelector('.search'),
    resultsList:document.querySelector('.results__list'),
    resultDiv:document.querySelector('.results'),
    resultPages:document.querySelector('.results__pages'),
    recipe:document.querySelector('.recipe'),
    shoppingList:document.querySelector('.shopping__list'),
    likeMenu:document.querySelector('.likes__field'),
    likeList:document.querySelector('.likes__list'),

}
const elementsStrings={
    loader:'loader'
}

export const renderLoader = (resultList) =>{
   const loader= `<div class=${elementsStrings.loader}>
         <svg>
             <use href="img/icons.svg#icon-cw"></use>
         </svg>
    
    </div`;
     resultList.insertAdjacentHTML('afterbegin',loader);
}


export const clearLoader= () =>{
      const loader=document.querySelector(`.${elementsStrings.loader}`);
      loader.parentElement.removeChild(loader);
}