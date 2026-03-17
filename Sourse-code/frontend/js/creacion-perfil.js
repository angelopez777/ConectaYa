document.querySelector('.profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const selected = document.querySelector('input[name="user-type"]:checked').value;
    
    if (selected === 'cliente') {
        window.location.href = 'perfil-usuario.html';
    } else {
        // Lógica para trabajador o empresa si existieran esas páginas
        alert('Funcionalidad para ' + selected + ' en desarrollo.');
    }
});