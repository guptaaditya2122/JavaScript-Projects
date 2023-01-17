
window.onload = function setTemplate() {
    document.getElementById('allcomments').innerHTML = localStorage.getItem('template');
};

const commentsContainer = document.getElementById('allcomments');
const addButton = document.getElementById('addComment')

addButton.addEventListener('click',(event)=>addComment(event))

function createButton(classN,buttonName){
    const button = document.createElement('button');
    button.className = classN
    button.innerHTML = buttonName

    return button
}

function addComment(event){
    console.log('addComment,',event)
    let commentText;
    const textArea = document.createElement('div');
    
    //Reply button
    const replyButton = createButton('reply','Reply')
    replyButton.style.backgroundColor = '#18A8D8'
    replyButton.addEventListener('click',(event)=>{
        addReply(event)
        setOnLocalStorage ()
    })

    // delete button
    const deleteButton = createButton('delete','Delete')
    deleteButton.style.backgroundColor='red'
    deleteButton.addEventListener('click',(event)=>deleteReply(event))


    if(hasClass(event.target.parentElement , 'container')){
        const wrapperDiv= document.createElement('div');
        wrapperDiv.className = 'wrapper';
        wrapperDiv.style.margin ='16px 0px 16px 0px';
    
        commentText = document.getElementById('newComment').value;
        document.getElementById('newComment').value =''
        textArea.innerHTML = commentText;
        wrapperDiv.append(textArea,replyButton,deleteButton);
        commentsContainer.appendChild(wrapperDiv);
    
    }
    else{
        const wrapDiv = event.target.parentElement;
        commentText = event.target.parentElement.firstElementChild.value
        textArea.innerHTML = commentText;
        wrapDiv.innerHTML = '';
        wrapDiv.append(textArea,replyButton,deleteButton);
    }
    setOnLocalStorage ()
}

function addReply(event){
    console.log('clicking',event)
    const parentdiv = event.target.parentElement;
    const wrapDiv = document.createElement('div');
    wrapDiv.className = 'addReply';
    wrapDiv.style.margin ='16px 0px 16px 0px';
    wrapDiv.style.marginLeft = (Number.parseInt(parentdiv.style.marginLeft) + 15 ) + 'px';

    const input = document.createElement('input');
    const addReplyButton = createButton('addReplyButton','Add comment')
    addReplyButton.style.backgroundColor = '#18A8D8'
    addReplyButton.addEventListener('click',(event)=>addComment(event))

    const cancelReply = createButton('cancelReply','Cancel');
    cancelReply.style.backgroundColor='red'
    cancelReply.addEventListener('click',(event)=>{
        deleteReply(event)
    })

    wrapDiv.append(input, addReplyButton,cancelReply);
    parentdiv.appendChild(wrapDiv);

}


function deleteReply(event){
    event.target.parentElement.remove();
    setOnLocalStorage ()
}

function hasClass(event,className){
    return event.className.split(' ').includes(className)
}

function setOnLocalStorage () {
    localStorage.setItem('template', document.getElementById('allcomments').innerHTML);
}
