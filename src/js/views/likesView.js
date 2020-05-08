import {elements} from './base'
export const toggleLike = (isLiked)=>{

    const iconstring= isLiked? 'icon-heart':'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconstring}`);
}
export const toggleLikeMenu=(numLikes)=>{

elements.likeMenu.style.visibility=numLikes>0?'visible':'hidden';

}

export const renderLikedList=(like)=>{
    const markup=`
    <li>
                            <a class="likes__link" href="${like.id}">
                                <figure class="likes__fig">
                                    <img src="${like.img}" alt="Test">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${like.title}</h4>
                                    <p class="likes__author">${like.author}</p>
                                </div>
                            </a>
                        </li>`;
                        console.log("like after render");
                       console.log(like);
                        elements.likeList.insertAdjacentHTML('beforeend',markup);
}

export const deleteLikeList= (id)=>{
    const el=document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
}