// src/public/js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
        return;
    }

    const activeList = document.getElementById('active-reservations-list');
    const pastList = document.getElementById('past-reservations-list');
    const logoutBtn = document.getElementById('logoutBtn');

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    });

    const headers = { 'Authorization': `Bearer ${token}` };

    // --- FUNÇÃO PARA CRIAR E MOSTRAR O MODAL DE CANCELAMENTO ---
    const showCancelModal = (reservation) => {
        // Remove qualquer modal existente
        document.querySelector('.modal-overlay')?.remove();

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const dataFormatada = new Date(reservation.data_reserva).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
        const hora_inicio = reservation.hora_inicio.substring(0, 5);
        const hora_fim = reservation.hora_fim.substring(0, 5);

        modalOverlay.innerHTML = `
            <div class="modal-content">
                <h3>Cancelar Reserva</h3>
                <p>Você tem certeza que deseja cancelar a reserva da <strong>${reservation.sala_codigo}</strong> para o dia <strong>${dataFormatada}</strong> das <strong>${hora_inicio} às ${hora_fim}</strong>?</p>
                <div class="modal-footer">
                    <button class="modal-button modal-button-cancel">Voltar</button>
                    <button class="modal-button modal-button-confirm">Sim, Cancelar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        // Adiciona a classe 'visible' para ativar a animação de fade-in
        setTimeout(() => modalOverlay.classList.add('visible'), 10);

        // Event listeners dos botões do modal
        const confirmBtn = modalOverlay.querySelector('.modal-button-confirm');
        const cancelBtn = modalOverlay.querySelector('.modal-button-cancel');
        
        confirmBtn.addEventListener('click', async () => {
            confirmBtn.textContent = 'Cancelando...';
            confirmBtn.disabled = true;

            try {
                const res = await fetch(`/api/reservations/${reservation.id}/cancel`, {
                    method: 'PATCH',
                    headers
                });
                
                if (!res.ok) throw new Error('Falha ao cancelar reserva.');
                
                // Sucesso! Fecha o modal e recarrega as reservas
                modalOverlay.remove();
                fetchAllReservations(); // Recarrega as listas para refletir a mudança
            } catch (error) {
                alert('Ocorreu um erro ao cancelar. Tente novamente.');
                confirmBtn.textContent = 'Sim, Cancelar';
                confirmBtn.disabled = false;
            }
        });

        cancelBtn.addEventListener('click', () => {
            modalOverlay.remove();
        });
    };
    
    // Função para renderizar as reservas
    const renderReservations = (container, reservations, emptyMessage, isClickable) => {
        if (!reservations || reservations.length === 0) {
            container.innerHTML = `<p>${emptyMessage}</p>`;
            return;
        }
        
        container.innerHTML = '';
        reservations.forEach(reserva => {
            const card = document.createElement('div');
            card.className = `reservation-card status-${reserva.status.toLowerCase()}`;
            
            if(isClickable) {
                card.style.cursor = 'pointer';
                card.title = 'Clique para ver opções';
                card.dataset.reservation = JSON.stringify(reserva); // Armazena todos os dados da reserva no card
            }
            
            const data = new Date(reserva.data_reserva).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
            const hora_inicio = reserva.hora_inicio.substring(0, 5);
            const hora_fim = reserva.hora_fim.substring(0, 5);

            card.innerHTML = `
                <div class="reservation-details">
                    <h3>${reserva.sala_codigo}</h3>
                    <p><strong>Data:</strong> ${data}</p>
                    <p><strong>Horário:</strong> ${hora_inicio} às ${hora_fim}</p>
                    <p><strong>Status:</strong> ${reserva.status}</p>
                </div>
                <span class="arrow-icon">&gt;</span>
            `;
            container.appendChild(card);
        });
    };
    
    // Adiciona o Event Listener na lista de reservas ativas (usando delegação de eventos)
    activeList.addEventListener('click', (event) => {
        const card = event.target.closest('.reservation-card');
        if (card && card.dataset.reservation) {
            const reservationData = JSON.parse(card.dataset.reservation);
            showCancelModal(reservationData);
        }
    });

    // Função para buscar os dois tipos de reserva
    const fetchAllReservations = async () => {
        try {
            // Limpa as listas e mostra mensagem de carregamento
            activeList.innerHTML = '<p>Carregando reservas ativas...</p>';
            pastList.innerHTML = '<p>Carregando histórico...</p>';

            const [activeRes, pastRes] = await Promise.all([
                fetch('/api/reservations/active', { headers }),
                fetch('/api/reservations/past', { headers })
            ]);

            if (!activeRes.ok || !pastRes.ok) {
                if (activeRes.status === 401 || pastRes.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                }
                throw new Error('Falha ao autenticar ou buscar reservas.');
            }

            const activeReservations = await activeRes.json();
            const pastReservations = await pastRes.json();
            
            // Renderiza as ativas como clicáveis, e as passadas não
            renderReservations(activeList, activeReservations, 'Nenhuma reserva ativa encontrada.', true);
            renderReservations(pastList, pastReservations, 'Nenhum histórico de reservas encontrado.', false);

        } catch (err) {
            console.error(err);
            activeList.innerHTML = '<p class="error">Não foi possível carregar as reservas.</p>';
            pastList.innerHTML = '<p class="error">Não foi possível carregar o histórico.</p>';
        }
    };

    fetchAllReservations();
});