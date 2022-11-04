const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const items = JSON.parse(localStorage.getItem("items")) || []

items.forEach(element => {
    createElement(element);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = event.target.elements['nome'].value;
    const quantidade = event.target.elements['quantidade'].value;
    
    const existe = items.find( element => element.nome===nome);
    const currentItem = {
        "nome": nome,
        "quantidade": quantidade 
    };
    
    if (existe) {
        currentItem.id = existe.id;

        updateElement(currentItem);
        items[items.findIndex(element => element.id===existe.id)] = currentItem;
    } else {
        currentItem.id = items[items.length-1] ? (items[items.length-1]).id+1 : 0;
        
        createElement(currentItem);
        items.push(currentItem);
    }

    localStorage.setItem("items", JSON.stringify(items));
    
    form.reset();
});

function createElement(item){
    const newItem = document.createElement('li');
    newItem.classList.add('item');

    const numberItem = document.createElement('strong');
    numberItem.innerHTML = item.quantidade;
    numberItem.dataset.id = item.id;
    newItem.appendChild(numberItem);
    newItem.innerHTML += item.nome;

    newItem.appendChild(deleteButton(item.id));

    lista.appendChild(newItem);
};

function updateElement(item){
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade;
};

function deleteButton(id) {
    const elementButton = document.createElement('button');
    elementButton.innerText = "X";

    elementButton.addEventListener('click', function() {
        deleteElement(this.parentNode, id);
    });

    return elementButton;
};

function deleteElement(tag, id){
    tag.remove()
    items.splice(items.findIndex(element => element.id===id), 1);

    localStorage.setItem("items", JSON.stringify(items));
}