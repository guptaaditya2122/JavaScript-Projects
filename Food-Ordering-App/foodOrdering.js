const input = document.getElementById('input');
const sortBy = document.getElementById('sortBy');
const filterBy =document.getElementById('filterBy')
const cardsContainer = document.getElementById('cards-container')
const erroMessage = document.getElementById('error-message')

let restaurentList =[];
let timerId;

// get Data 
let getData = ()=> fetch('./data/data.json').then(res=> res.json());


// form Restaurent Card

const generateRestaurentCard = (restaurent)=>{
    const div = document.createElement('div');
    div.className='wrap-div'
    const heading = document.createElement('h3');
    heading.textContent = restaurent.name;
    const Desc = document.createElement('p');
    Desc.textContent = restaurent.location
    const img = document.createElement('img');
    img.setAttribute('src',restaurent.img);
    img.setAttribute('width' ,"200px");
    img.setAttribute('height' ,"200px");

    const wrapDiv = document.createElement('div')
    const rating = document.createElement('p');
    rating.textContent = 'Rating: '+ restaurent.rating;
    const eta = document.createElement('p');
    eta.textContent = 'ETA: '+restaurent.eta+'mins';
    wrapDiv.className='display'
    wrapDiv.style.margin='16px'
    wrapDiv.append(rating,eta)
    const tagDiv = document.createElement('div')
    tagDiv.style.display ='flex'
    const fragment = document.createDocumentFragment()
    restaurent.tags.forEach(el=>{
        const element = document.createElement('p');
        element.textContent = el
        element.className='tag'
        fragment.appendChild(element)
    });
    tagDiv.append(fragment)

    div.append(heading,Desc,img,wrapDiv,tagDiv)
    return div
}


// generate view with the restaurent card and data

const generateList = (data)=>{
    cardsContainer.innerHTML =''
    data.forEach((restaurent)=>{
    cardsContainer.appendChild(generateRestaurentCard(restaurent))
});}

// Display the Restaurent Cards

const displayCards = async ()=>{
    getData().then(resp=>{
        restaurentList = [...resp];
        generateList(restaurentList)
                
    })
        
}
displayCards()

// Search functionality

input.addEventListener('input',()=>{
    debounce(searchResults,500)
});

function searchResults(){
    let searchedResults = restaurentList.filter(el=>{
        return (el.name.toLowerCase().indexOf(input.value.toLowerCase()) > -1)
    })
    generateList(searchedResults)
}

function debounce(func,delay){

    if (timerId){
        clearTimeout(timerId);
    }

    timerId = setTimeout(func,delay)
}

// sort Functionality

sortBy.addEventListener('change',(event)=>sortResults(event))

function sortResults(event){
    
    if(event.target.value === 'rating'){
        let sortedRating = restaurentList.sort((a,b)=>b.rating-a.rating);
         generateList(sortedRating)
    }
    else if(event.target.value === 'eta'){
        let sortedEta = restaurentList.sort((a,b)=>b.eta-a.eta);
         generateList(sortedEta)
    }
    else{
        displayCards()
    }
}

// filter Functionality

filterBy.addEventListener('change',(event)=> filterResults(event));

function filterResults(event){

    let filteredResults = restaurentList.filter(el=>{
        return el.tags.toString().toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
    });
        generateList(filteredResults)
}

let obj1={key: "A"}
let obj2=obj1
let obj3=obj2
let obj4 =obj3

obj1.key="B"
obj2={key: "C"}
obj3 ={key:'D'}

console.log(obj1,obj2,obj3,obj4)
console.log(obj1.key, obj2.key, obj3.key)

const obj = {
    a: 'foo',
    b: function() {
    console.log(this.a);
    }
    };
    
    const c = obj.b;
    
    obj.b();
    c();