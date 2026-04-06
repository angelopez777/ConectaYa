/**
 * contratos-trabajador.js
 * Gestión de carga y renderizado de contratos desde el rol profesional.
 */

document.addEventListener('DOMContentLoaded', () => {
    fetchContratosProfesionales();

    document.getElementById('btn-refresh-contratos').addEventListener('click', () => {
        location.reload();
    });
});

/**
 * Obtiene los datos del backend vinculando 'solicitudes_contacto' con 'usuario' (cliente)
 */
async function fetchContratosProfesionales() {
    const tableView = document.getElementById('table-view');
    const statusView = document.getElementById('status-view');
    const listado = document.getElementById('lista-contratos-trabajador');

    try {
        // Ruta al backend según estructura de carpetas
        const response = await fetch('../../../backend/obtener-contratos.php?rol=trabajador');
        const data = await response.json();

        if (data.success && data.contratos.length > 0) {
            statusView.style.display = 'none';
            tableView.style.display = 'block';
            
            listado.innerHTML = data.contratos.map(contrato => `
                <tr>
                    <td>
                        <div class="user-info">
                            <span class="name">${contrato.nombre_cliente}</span>
                        </div>
                    </td>
                    <td>${contrato.servicio}</td>
                    <td>${contrato.fecha_inicio}</td>
                    <td><span class="neon-text">$${contrato.monto}</span></td>
                    <td><span class="status-badge ${contrato.estado.toLowerCase()}">${contrato.estado}</span></td>
                    <td>
                        <button class="btn-icon-neon" onclick="descargarPDF(${contrato.id})">
                            <i class="fas fa-file-download"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
            
            document.getElementById('count-active').innerText = data.contratos.length;
        } else {
            document.getElementById('status-spinner').style.display = 'none';
            document.getElementById('status-text').innerText = "No tienes contratos registrados actualmente.";
        }
    } catch (error) {
        console.error("Error en ConectaYa Sync:", error);
        document.getElementById('status-text').innerText = "Error al conectar con el servidor.";
    }
}

function descargarPDF(id) {
    alert("Generando comprobante legal del contrato #" + id);
    // Lógica futura con FPDF o DomPDF en el backend
}
