document.addEventListener('DOMContentLoaded', () => {
    const syncBtn = document.getElementById('sync-btn');
    
    if (syncBtn) {
        syncBtn.addEventListener('click', async () => {
            const icon = syncBtn.querySelector('i');
            icon.classList.add('fa-spin');
            
            // Simular carga de datos
            try {
                const response = await fetch('../../../backend/obtener-contratos.php');
                const data = await response.json();
                console.log("ConectaYa Sync:", data);
            } catch (e) {
                console.log("Error de conexión");
            } finally {
                setTimeout(() => icon.classList.remove('fa-spin'), 800);
            }
        });
    }
});