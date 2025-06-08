// src/public/js/new-reservation.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/'; return; }

    const roomGrid = document.getElementById('room-selection-grid');
    const calendarOverlay = document.getElementById('calendar-overlay');
    const timeBlockOverlay = document.getElementById('time-block-overlay');
    const calendarDaysGrid = document.getElementById('calendar-days-grid');
    const currentMonthYearEl = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const timeBlockGrid = document.getElementById('time-block-grid');
    const reserveBtn = document.getElementById('reserve-btn');
    const messageEl = document.getElementById('reservation-message');
    
    const roomIdInput = document.getElementById('selected-room-id');
    const dateInput = document.getElementById('selected-date');
    const timeIdInput = document.getElementById('selected-time-id');

    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    
    let state = {
        currentDate: new Date(),
        selectedRoom: null,
        selectedDateObj: null,
        selectedTime: null,
        rooms: [],
        timeBlocks: [],
        unavailableDays: []
    };

    const renderRooms = () => {
        roomGrid.innerHTML = '';
        state.rooms.forEach(room => {
            const card = document.createElement('div');
            card.className = 'selection-card room-card';
            card.dataset.roomId = room.id;
            card.innerHTML = `<div class="card-icon">&#127970;</div><div class="card-title">${room.codigo}</div>`;
            card.addEventListener('click', () => handleRoomSelect(room.id));
            roomGrid.appendChild(card);
        });
    };

    const renderCalendar = () => {
        calendarDaysGrid.innerHTML = '';
        const date = state.currentDate;
        const year = date.getFullYear();
        const month = date.getMonth();
        currentMonthYearEl.textContent = `${date.toLocaleString('pt-BR', { month: 'long' })} de ${year}`;
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < firstDayOfMonth; i++) calendarDaysGrid.innerHTML += `<div class="calendar-day empty"></div>`;

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            const dayDate = new Date(year, month, day);
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;
            
            if (dayDate < today) {
                dayEl.classList.add('past');
            } else if (state.unavailableDays.includes(day)) {
                dayEl.classList.add('unavailable');
                dayEl.title = 'Todos os horários ocupados neste dia.';
            } else {
                dayEl.addEventListener('click', () => handleDateSelect(dayDate));
            }
            
            if (state.selectedDateObj && state.selectedDateObj.getTime() === dayDate.getTime()) {
                dayEl.classList.add('selected');
            }
            calendarDaysGrid.appendChild(dayEl);
        }
    };
    
    const renderTimeBlocks = () => {
        timeBlockGrid.innerHTML = '';
        state.timeBlocks.forEach(block => {
            const card = document.createElement('div');
            card.className = 'selection-card time-card';
            card.dataset.timeId = block.id;
            card.innerHTML = `<div class="card-icon">&#9200;</div><div class="card-title">${block.hora_inicio.substring(0, 5)} - ${block.hora_fim.substring(0, 5)}</div>`;
            card.addEventListener('click', () => handleTimeSelect(block.id));
            timeBlockGrid.appendChild(card);
        });
    };

    // --- LÓGICA DE UI CORRIGIDA E ROBUSTA ---
    const updateUI = () => {
        // Controla visibilidade dos overlays
        calendarOverlay.classList.toggle('hidden', !!state.selectedRoom);
        timeBlockOverlay.classList.toggle('hidden', !!state.selectedDateObj);

        // Aplica/Remove a classe .selected para Salas
        document.querySelectorAll('.room-card').forEach(card => {
            card.classList.toggle('selected', String(card.dataset.roomId) === String(state.selectedRoom));
        });

        // Aplica/Remove a classe .selected para Horários
        document.querySelectorAll('.time-card').forEach(card => {
            card.classList.toggle('selected', String(card.dataset.timeId) === String(state.selectedTime));
        });
        
        // Renderiza o calendário, que aplica a classe .selected para a data
        renderCalendar();
        
        const isComplete = state.selectedRoom && state.selectedDateObj && state.selectedTime;
        reserveBtn.disabled = !isComplete;
        reserveBtn.textContent = isComplete ? 'Confirmar Reserva' : 'Selecione uma sala, data e horário';
    };

    const fetchAndRenderAvailability = async () => {
        if (!state.selectedRoom) return;
        const year = state.currentDate.getFullYear();
        const month = state.currentDate.getMonth() + 1;
        try {
            const res = await fetch(`/api/reservations/availability?sala_id=${state.selectedRoom}&year=${year}&month=${month}`, { headers });
            if (!res.ok) throw new Error('Falha ao buscar disponibilidade.');
            state.unavailableDays = await res.json();
            renderCalendar();
        } catch (error) { console.error(error); }
    };

    const handleRoomSelect = (roomId) => {
        state.selectedRoom = roomId;
        state.selectedDateObj = null;
        state.selectedTime = null;
        roomIdInput.value = roomId;
        dateInput.value = '';
        timeIdInput.value = '';
        fetchAndRenderAvailability();
        updateUI();
    };

    const handleDateSelect = (date) => {
        state.selectedDateObj = date;
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
        dateInput.value = localDate.toISOString().split('T')[0];
        state.selectedTime = null;
        timeIdInput.value = '';
        updateUI();
    };

    const handleTimeSelect = (timeId) => {
        state.selectedTime = timeId;
        timeIdInput.value = timeId;
        updateUI();
    };

    prevMonthBtn.addEventListener('click', () => {
        state.currentDate.setMonth(state.currentDate.getMonth() - 1);
        fetchAndRenderAvailability();
    });

    nextMonthBtn.addEventListener('click', () => {
        state.currentDate.setMonth(state.currentDate.getMonth() + 1);
        fetchAndRenderAvailability();
    });

    document.getElementById('reservationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        reserveBtn.disabled = true;
        reserveBtn.textContent = 'Reservando...';
        
        try {
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers,
                body: JSON.stringify({ sala_id: state.selectedRoom, data_reserva: dateInput.value, bloco_id: state.selectedTime })
            });
            const data = await res.json();
            messageEl.textContent = data.message;
            messageEl.className = res.ok ? 'message success' : 'message error';
            if (res.ok) setTimeout(() => window.location.href = '/dashboard', 2000);
        } catch (error) {
            messageEl.textContent = 'Erro de conexão.';
            messageEl.className = 'message error';
        } finally {
            if(!messageEl.classList.contains('success')) {
                reserveBtn.disabled = false;
                reserveBtn.textContent = 'Confirmar Reserva';
            }
        }
    });

    const initializePage = async () => {
        try {
            const [roomsRes, timeBlocksRes] = await Promise.all([
                fetch('/api/reservations/rooms', { headers }),
                fetch('/api/reservations/time-blocks', { headers })
            ]);
            state.rooms = await roomsRes.json();
            state.timeBlocks = await timeBlocksRes.json();
            renderRooms();
            renderTimeBlocks();
            updateUI();
        } catch (error) { console.error(error); }
    };
    
    initializePage();
});