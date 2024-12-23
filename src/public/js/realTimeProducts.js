
const socket = io()










const title = document.getElementById('title')
const description = document.getElementById('description')
const code = document.getElementById('code')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const formulario = document.getElementById('formulario')
const submitBtn = document.getElementById('submitBtn')

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        title: title.value,
        description: description.value,
        code: parseInt(code.value),
        price: parseInt(price.value),
        stock: parseInt(stock.value),
        category: category.value
    };

    socket.emit('formulario', data);

    title.value = '';
    description.value = '';
    code.value = '';
    price.value = '';
    stock.value = '';
    category.value = '';
});

socket.on('error', (error) => {
    console.log(error)
})
socket.on('success', (respuesta) => {
    console.log(respuesta.message)
})
socket.on('productos', (data) => {
    console.log(data)
    let productsDOM = data.map(product => `<li>
    <strong>${product.title}</strong>
    Precio: ${product.price}
    Id: ${product.id}
    </li>
    `).join('')

    const productos = document.getElementById('productos');
    productos.innerHTML = productsDOM;
})

const deletedProdId = document.getElementById('deleteId')
const deleteBtn =document.getElementById('deleteBtn')
const deleteProdForm = document.getElementById('deleteProdForm')

deleteProdForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const idToBeDeleted = parseInt(deletedProdId.value)
    socket.emit('eliminar',idToBeDeleted)

})

socket.on('notDeleted', (error) => {
    console.log(error)
})
socket.on('deleted', (respuesta) => {
    console.log(respuesta.message)
})