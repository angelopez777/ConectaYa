/* LÓGICA DINÁMICA PARA PERFIL TRABAJADOR 
    Cada función es independiente para evitar errores de duplicación incorrecta.
*/

// 1. Agregar Rangos de Horas
function agregarFilaHorario() {
    const contenedor = document.getElementById('contenedor-horarios');
    const div = document.createElement('div');
    div.className = 'fila-dinamica';
    div.innerHTML = `
        <div class="bloque-input">
            <span>De:</span>
            <input type="time" name="h_ini[]">
        </div>
        <div class="bloque-input">
            <span>A:</span>
            <input type="time" name="h_fin[]">
        </div>
        <button type="button" class="btn-quitar" onclick="this.parentElement.remove()">&times;</button>
    `;
    contenedor.appendChild(div);
}

// 2. Agregar Labores / Experiencia
function agregarFilaLabor() {
    const contenedor = document.getElementById('contenedor-labores');
    const div = document.createElement('div');
    div.className = 'fila-dinamica';
    div.innerHTML = `
        <input type="text" name="labor[]" placeholder="Labor (Ej: Plomero)" class="input-largo">
        <input type="number" name="exp[]" placeholder="Años" class="input-corto">
        <button type="button" class="btn-quitar" onclick="this.parentElement.remove()">&times;</button>
    `;
    contenedor.appendChild(div);
}

// 3. Agregar Títulos / Estudios
function agregarFilaEstudio() {
    const contenedor = document.getElementById('contenedor-estudios');
    const div = document.createElement('div');
    div.className = 'fila-dinamica-col';
    div.innerHTML = `
        <input type="text" name="titulo[]" placeholder="Otro título obtenido">
        <select name="nivel[]">
            <option value="Bachiller">Bachiller</option>
            <option value="Tecnico">Técnico</option>
            <option value="Tecnologo">Tecnólogo</option>
            <option value="Profesional">Profesional</option>
        </select>
        <button type="button" class="btn-quitar-estudio" onclick="this.parentElement.remove()">Eliminar campo</button>
    `;
    contenedor.appendChild(div);
}

// Preview de la foto de perfil
document.getElementById('input-foto')?.addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        document.getElementById('preview-foto').src = reader.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});