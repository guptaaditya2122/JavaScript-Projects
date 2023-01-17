

const backLogInput = document.getElementById('backlog');
const backlogButton = document.getElementById('addBacklog');
const backlogItems  = document.getElementById('backlogItems')

const dropContainer = document.querySelectorAll('.dropzone');
dropContainer.forEach(box=>{
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
})


backLogInput.addEventListener('input',()=>{
    if(backLogInput.value.length !== 0){
        backlogButton.disabled = false
    }else{
        backlogButton.disabled = true
    }
})

backlogButton.addEventListener('click',addBacklogItem);

function addBacklogItem(){
    const listItem = createDraggableListItem();
    backlogItems.appendChild(listItem)
    backLogInput.value = '';
    backlogButton.disabled = true;
}


function stylingElement(node){
    node.style.display ='flex'
    node.style.justifyContent='space-between'
    node.style.backgroundColor='aquamarine'
    node.style.border ='1px solid black';
    node.style.margin='20px 20px 20px 0px'
}

function onDelete(){
    this.parentNode.remove()
}

function createDraggableListItem(){
    const listItem = document.createElement('li');
    stylingElement(listItem)
    listItem.setAttribute("draggable", "true");
    listItem.setAttribute("id", generateId());
    listItem.addEventListener('dragstart',dragStart);

    const heading = document.createElement('h4');
    heading.textContent = backLogInput.value;

    const deleteButton = document.createElement('button');
    deleteButton.textContent= 'X';
    deleteButton.style.background ='none'
    deleteButton.style.marginLeft ='16px'
    deleteButton.style.border ='1px solid transparent';

    deleteButton.addEventListener('click',onDelete)

    listItem.append(heading,deleteButton);
    return listItem;
}

function generateId(){
    console.log('random')
    return Math.floor((Math.random() * 100) + 1)
}

function dragStart(event){
    console.log('drag start...',event)
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.classList.add('hide');
}

function dragEnter(event){
    event.preventDefault()
    console.log('dropzone entry')
}

function dragOver(event) {
    event.preventDefault()
    console.log('dropzone entry')

}

function dragLeave(e) {
    console.log('dropzone entry')

}

function drop(e) {
    console.log('dropzone entry')

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');

}