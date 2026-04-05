/**
 * PROYECTO: ConectaYa
 * FUNCIONALIDAD: Gestión Profesional de Contratos para Clientes
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar carga de contratos al abrir la página
    fetchContratos();
});

async function fetchContratos() {
    // Referencias al DOM
    const tbody = document.getElementById('lista-contratos');
    const tableView = document.getElementById('table-view');
    const statusView = document.getElementById('status-view');
    const spinner = document.getElementById('status-spinner');
    const icon = document.getElementById('status-icon');
    const text = document.getElementById('status-text');

    // Estado inicial: Mostrando carga
    tbody.innerHTML = "";
    tableView.style.display = "none";
    statusView.style.display = "flex";
    spinner.style.display = "block";
    icon.style.display = "none";
    text.innerText = "Sincronizando tus acuerdos...";

    // Simulación de respuesta de base de datos (Backend Placeholder)
    // Para probar el estado vacío, deja el array]
    // Para probar con datos, descomenta el objeto de ejemplo.
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulando lag de red

    const data = [
        /* Ejemplo de datos simulados:
        {
            id: 'CY-5521',
            servicio: "Mantenimiento A/C",
            profesional: "Carlos Ruiz",
            profesional_img: "../../img/perfiles/t-1.jpg", // Placeholder
            fecha: "05 Abr, 2026",
            monto: "$85.000",
            estado: "activo"
        },
        {
            id: 'CY-5522',
            servicio: "Instalación Eléctrica",
            profesional: "Ana Morales",
            profesional_img: "../../img/perfiles/t-2.jpg",
            fecha: "12 Mar, 2026",
            monto: "$120.000",
            estado: "completado"
        }
        */
    ];

    // Lógica de visualización
    if (data.length === 0) {
        // Estado: Sin datos
        spinner.style.display = "none";
        icon.style.display = "block";
        text.innerText = "No tienes contratos registrados actualmente.";
    } else {
        // Estado: Con datos, renderizar tabla
        statusView.style.display = "none";
        tableView.style.display = "block";

        tbody.innerHTML = data.map(item => `
            <tr>
                <td>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <img src="${item.profesional_img || '../../img/dashboard/avatar-placeholder.png'}" 
                             alt="${item.profesional}" 
                             style="width: 40px; height: 40px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); object-fit: cover;">
                        <div>
                            <div style="font-weight: 600; font-size: 1rem; color: #fff;">${item.servicio}</div>
                            <div style="font-size: 0.85rem; color: var(--text-dim); margin-top: 2px;">Con: ${item.profesional}</div>
                        </div>
                    </div>
                </td>
                <td style="color: #eee;">${item.fecha}</td>
                <td style="color: var(--neon); font-weight: 700; font-size: 1.1rem; text-shadow: 0 0 10px rgba(168, 85, 247, 0.2);">
                    ${item.monto}
                </td>
                <td>
                    <span class="status-pill status-${item.estado.toLowerCase()}">
                        <i class="fas fa-circle"></i> ${item.estado}
                    </span>
                </td>
                <td>
                    <div class="actions-group">
                        <button class="btn-action-icon" onclick="window.location.href='detalle-contrato.html?id=${item.id}'" title="Ver Detalles">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action-icon" onclick="alert('Descargar PDF de ${item.id}')" title="Descargar PDF">
                            <i class="fas fa-file-pdf"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}