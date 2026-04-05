document.addEventListener('DOMContentLoaded', () => {
    const listaChats = document.getElementById('lista-chats');
    const chatBox = document.getElementById('chat-box');
    const msgInput = document.getElementById('input-contenido');
    const idSolicitudInput = document.getElementById('id_solicitud_actual');
    const form = document.getElementById('form-mensaje');
    const btnEnviar = document.getElementById('btn-enviar');
    const btnFoto = document.getElementById('btn-foto');
    const inputFoto = document.getElementById('input-foto');

    // Cargar conversaciones del backend
    const cargarChats = async () => {
        try {
            const res = await fetch('../../../backend/mensajes/listar-mensaje.php');
            const data = await res.json();
            if (data.success) {
                listaChats.innerHTML = '';
                data.chats.forEach(chat => {
                    const item = document.createElement('div');
                    item.className = 'chat-item-card';
                    item.innerHTML = `
                        <div class="chat-info-meta">
                            <strong>${chat.nombre_trabajador}</strong>
                            <p>${chat.ultimo_msg || 'Sin mensajes nuevos'}</p>
                        </div>
                    `;
                    item.onclick = () => abrirChat(chat.id_solicitud, chat.nombre_trabajador);
                    listaChats.appendChild(item);
                });
            }
        } catch (e) { console.error("Error al cargar chats", e); }
    };

    const abrirChat = (id, nombre) => {
        idSolicitudInput.value = id;
        document.getElementById('chat-receptor-nombre').innerText = nombre;
        msgInput.disabled = false;
        btnEnviar.disabled = false;
        
        const status = document.getElementById('status-text');
        status.classList.add('online');
        document.getElementById('label-status').innerText = 'En línea';
        obtenerMensajes();
    };

    const obtenerMensajes = async () => {
        const id = idSolicitudInput.value;
        if (!id) return;
        try {
            const res = await fetch(`../../../backend/mensajes/listar-mensaje.php?id_solicitud=${id}`);
            const data = await res.json();
            if (data.success) {
                chatBox.innerHTML = '';
                data.mensajes.forEach(m => {
                    const bubble = document.createElement('div');
                    bubble.className = `bubble ${m.es_mio ? 'me' : 'them'}`;
                    bubble.innerText = m.contenido;
                    chatBox.appendChild(bubble);
                });
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        } catch (e) { console.error("Error al obtener mensajes", e); }
    };

    form.onsubmit = async (e) => {
        e.preventDefault();
        const texto = msgInput.value.trim();
        if (!texto) return;

        const formData = new FormData();
        formData.append('id_solicitud', idSolicitudInput.value);
        formData.append('mensaje', texto);

        const res = await (await fetch('../../../backend/mensajes/enviar-mensajes.php', {
            method: 'POST',
            body: formData
        })).json();

        if (res.success) {
            msgInput.value = '';
            obtenerMensajes();
        }
    };

    btnFoto.onclick = () => inputFoto.click();

    cargarChats();
    setInterval(obtenerMensajes, 5000); 
});