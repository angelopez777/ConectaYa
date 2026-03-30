document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById('input-file');
    const preview = document.getElementById('img-perfil');

    if(input) {
        input.addEventListener('change', () => {
            const file = input.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = (e) => preview.src = e.target.result;
                reader.readAsDataURL(file);
            }
        });
    }
});