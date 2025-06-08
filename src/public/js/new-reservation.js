document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
        return;
    }

    const roomSelect = document.getElementById('room-select');
    const timeBlockContainer = document.getElementById('time-block-container');
    const timeBlockIdInput = document.getElementById('time-block-id');
    const reservationForm = document.getElementById('reservationForm');
    const messageElement = document.getElementById('reservation-message');
    const dateSelect = document.getElementById('date-select');

    // Define a data mínima para hoje
    const today = new Date().toISOString().split('T')[0];
    dateSelect.setAttribute('min', today);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    // Buscar salas
    fetch('/api/reservations/rooms', { headers })
        .then(res => res.json())
        .then(rooms => {
            rooms.forEach(room => {
                const option = document.createElement('option');
                option.value = room.id;
                option.textContent = room.codigo;
                roomSelect.appendChild(option);
            });
        });

    // Buscar blocos de horário
    fetch('/api/reservations/time-blocks', { headers })
        .then(res => res.json())
        .then(blocks => {
            blocks.forEach(block => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'time-slot-btn';
                button.dataset.id = block.id;
                button.textContent = `${block.hora_inicio.substring(0, 5)} - ${block.hora_fim.substring(0, 5)}`;
                
                button.addEventListener('click', () => {
                    // Remove a seleção de outros botões
                    document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected-time'));
                    // Adiciona seleção ao botão clicado
                    button.classList.add('selected-time');
                    // Define o valor do input escondido
                    timeBlockIdInput.value = block.id;
                });

                timeBlockContainer.appendChild(button);
            });
        });

    // Enviar formulário de reserva
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const reserva = {
            sala_id: roomSelect.value,
            data_reserva: dateSelect.value,
            bloco_id: timeBlockIdInput.value
        };

        if (!reserva.sala_id || !reserva.data_reserva || !reserva.bloco_id) {
            messageElement.textContent = 'Por favor, preencha todos os campos.';
            messageElement.className = 'message error';
            return;
        }

        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers,
                body: JSON.stringify(reserva)
            });

            const data = await res.json();

            if (!res.ok) {
                messageElement.textContent = data.message;
                messageElement.className = 'message error';
            } else {
                messageElement.textContent = 'Reserva realizada com sucesso! Redirecionando...';
                messageElement.className = 'message success';
                setTimeout(() => window.location.href = '/dashboard', 2000);
            }
        } catch (err) {
            messageElement.textContent = 'Erro de conexão.';
            messageElement.className = 'message error';
        }
    });
});