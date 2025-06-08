document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const reservationsList = document.getElementById('reservations-list');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!token) {
        window.location.href = '/'; // Se não houver token, volta para a página de login
        return;
    }

    // Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    });

    // Buscar e exibir reservas antigas
    try {
        const res = await fetch('/api/reservations/past', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            if (res.status === 401) localStorage.removeItem('token');
            throw new Error('Falha ao buscar reservas.');
        }

        const reservations = await res.json();
        
        if (reservations.length === 0) {
            reservationsList.innerHTML = '<p>Nenhuma reserva antiga encontrada.</p>';
            return;
        }

        reservationsList.innerHTML = ''; // Limpa a mensagem padrão
        reservations.forEach(reserva => {
            const card = document.createElement('div');
            card.className = `reservation-card status-${reserva.status.toLowerCase()}`;
            
            // Formata a data e hora
            const data = new Date(reserva.data_reserva).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            const hora_inicio = reserva.hora_inicio.substring(0, 5);
            const hora_fim = reserva.hora_fim.substring(0, 5);

            card.innerHTML = `
                <div class="reservation-details">
                    <h3>${reserva.sala_codigo}</h3>
                    <p>Status: ${reserva.status}</p>
                    <p>Data: ${data}</p>
                    <p>Horário: ${hora_inicio} - ${hora_fim}</p>
                </div>
                <span class="arrow-icon">&gt;</span>
            `;
            reservationsList.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        reservationsList.innerHTML = '<p class="error">Não foi possível carregar suas reservas.</p>';
    }
});