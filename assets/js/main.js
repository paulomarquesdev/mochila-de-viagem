const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const items = JSON.parse(localStorage.getItem("items")) || []

items.forEach(element => {
    console.log(element)
    createElement(element);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = event.target.elements['nome'].value;
    const quantidade = event.target.elements['quantidade'].value;
    
    const currentItem = {
        "nome": nome,
        "quantidade": quantidade 
    };

    createElement(currentItem);
    
    items.push(currentItem);
    localStorage.setItem("items", JSON.stringify(items));
    
    form.reset();
});

function createElement(item){
    const newItem = document.createElement('li');
    newItem.classList.add('item');

    const numberItem = document.createElement('strong');
    numberItem.innerHTML = item.quantidade;

    newItem.appendChild(numberItem);
    newItem.innerHTML += item.nome;

    lista.appendChild(newItem);
};