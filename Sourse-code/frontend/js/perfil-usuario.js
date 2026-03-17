document.getElementById('photo-upload').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        const preview = document.getElementById('preview');
        preview.src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});