const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', (e) => {
    e.preventDefault()
    const producto = {
        title: document.getElementById('nombre').value,
        price: document.getElementById('precio').value,
        thumbnail: document.getElementById('foto').value
    };
    socket.emit('new-product', producto );
    formAgregarProducto.reset();
});

socket.on('new-product', async listaProd => {
    //generar el html y colocarlo en el tag productos llamando al funcion makeHtmlTable
    const html = await makeHtmlTable(listaProd);
    document.getElementById('productos').innerHTML = html;
});

function makeHtmlTable(data) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(resp => {
            const template = Handlebars.compile(resp);
            const html = template({data})
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername').value;
const inputMensaje = document.getElementById('inputMensaje').value;
const btnEnviar = document.getElementById('btnEnviar');
let date = new Date().toDateString();

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
    const mensaje = {
        inputUsername,
        inputMensaje, 
        date
    };
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajes => {
    console.log(mensajes);
    const html = makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    //Armar nuestro html para mostrar los mensajes como lo hicimos en clase
   
    socket.emit('new-message', mensaje);
    return false;
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
