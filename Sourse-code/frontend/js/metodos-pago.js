const modal = document.getElementById('paymentModal');
const btnOpen = document.getElementById('openModal');
const btnClose = document.getElementById('closeModal');

// Abrir modal al darle a OMITIR
btnOpen.onclick = function() {
    modal.style.display = "flex";
}

// Cerrar modal al darle a "Agregar ahora"
btnClose.onclick = function() {
    modal.style.display = "none";
}

// Cerrar si hacen clic fuera del cuadro
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}