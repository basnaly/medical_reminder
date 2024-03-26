const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']


function deleteAppointment(appointment_id) {
    fetch(`/delete_appointment/${appointment_id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const messageElement = document.createElement('div');
        messageElement.className = "alert alert-danger mt-4 shadow";
        messageElement.id = "message"
        document.querySelector('#display-items').prepend(messageElement);
        document.querySelector('#message').innerHTML = data.message;

        setTimeout(() => {
            document.querySelector('#message').innerHTML = "";
            // refresh page
            window.location.replace(window.location.href);
        }, 5000)  
    })
    .catch(error => {
        console.log('Error:', error)
    })
}


function displayEditAppointment(appointment_id, doctor_name, date_visit, time_visit, place_visit, notes) {

    const exsistingAppointment = document.getElementById('edit-appointment');
    if (exsistingAppointment) {
        exsistingAppointment.remove();
    }

    // div of the edited table
    const parentElement = document.createElement('div');
    parentElement.className = 'd-flex flex-column border rounded-3 p-3';
    parentElement.id = 'edit-appointment';
    document.querySelector('#edit-appointment-table').append(parentElement);

    // div of the all elements
    const editedElements = document.createElement('div');
    editedElements.className = 'd-flex flex-column';
    parentElement.append(editedElements);

    // div of doctor's name
    const nameAppointmentGroup = document.createElement('div');
    nameAppointmentGroup.className = 'input-group mb-3';
    editedElements.append(nameAppointmentGroup);

    const spanNameAppointmentElement = document.createElement('span');
    spanNameAppointmentElement.className = 'input-group-text';
    spanNameAppointmentElement.innerHTML = 'Doctor Name';
    nameAppointmentGroup.append(spanNameAppointmentElement);

    const inputNameAppointmentElement = document.createElement('input');
    inputNameAppointmentElement.type = 'text';    
    inputNameAppointmentElement.className = 'form-control';
    inputNameAppointmentElement.id = 'edit-appointment-name';
    nameAppointmentGroup.append(inputNameAppointmentElement);
    inputNameAppointmentElement.focus();
    inputNameAppointmentElement.value = doctor_name;

    // div of the date visit
    const dateAppointmentGroup = document.createElement('div');
    dateAppointmentGroup.className = 'input-group mb-3';
    editedElements.append(dateAppointmentGroup);

    const spanDateAppointmentElement = document.createElement('span');
    spanDateAppointmentElement.className = 'input-group-text';
    spanDateAppointmentElement.innerHTML = 'Date Visit';
    dateAppointmentGroup.append(spanDateAppointmentElement);

    const inputDateAppointmentElement = document.createElement('input');
    inputDateAppointmentElement.type = 'date';    
    inputDateAppointmentElement.className = 'form-control';
    inputDateAppointmentElement.id = 'edit-appointment-date';
    dateAppointmentGroup.append(inputDateAppointmentElement);

    const formatted_date = new Date(date_visit);
    console.log(formatted_date)

    const date_year = formatted_date.getFullYear();
    let date_month = formatted_date.getMonth() + 1;
    let date_day = formatted_date.getDate();

    let date_day_week = formatted_date.getDay();
    console.log(WEEK_DAYS[date_day_week])

    if (date_month < 10) {
        date_month = '0' + date_month
    }
    if (date_day < 10) {
        date_day = '0' + date_day
    }
    const date = date_year + '-' + date_month + '-' + date_day;
    inputDateAppointmentElement.value = date;
    console.log(date)

    // div of the time visit
    const timeAppointmentGroup = document.createElement('div');
    timeAppointmentGroup.className = 'input-group mb-3';
    editedElements.append(timeAppointmentGroup);

    const spanTimeAppointmentElement = document.createElement('span');
    spanTimeAppointmentElement.className = 'input-group-text';
    spanTimeAppointmentElement.innerHTML = 'Time Visit';
    timeAppointmentGroup.append(spanTimeAppointmentElement);

    const inputTimeAppointmentElement = document.createElement('input');
    inputTimeAppointmentElement.type = 'time';    
    inputTimeAppointmentElement.className = 'form-control';
    inputTimeAppointmentElement.id = 'edit-appointment-time';
    timeAppointmentGroup.append(inputTimeAppointmentElement );

    const [time, period] = time_visit.split(' ');
    const [hour, minute] = time.split(':');
    let formattedHour = parseInt(hour);

    if (period === 'p.m.') {
        formattedHour += 12
    }

    const formatted_time = formattedHour + ':' + minute;

    inputTimeAppointmentElement.value = formatted_time;
    console.log(time_visit)
    console.log(formatted_time)

    // div of the place visit
    const placeAppointmentGroup = document.createElement('div');
    placeAppointmentGroup.className = 'input-group mb-3';
    editedElements.append(placeAppointmentGroup);

    const spanPlaceAppointmentElement = document.createElement('span');
    spanPlaceAppointmentElement.className = 'input-group-text';
    spanPlaceAppointmentElement.innerHTML = 'Place Visit';
    placeAppointmentGroup.append(spanPlaceAppointmentElement);

    const inputPlaceAppointmentElement = document.createElement('input');
    inputPlaceAppointmentElement.type = 'text';    
    inputPlaceAppointmentElement.className = 'form-control';
    inputPlaceAppointmentElement.id = 'edit-appointment-place';
    placeAppointmentGroup.append(inputPlaceAppointmentElement );
    inputPlaceAppointmentElement.value = place_visit;

    // div of the notes
    const notesAppointmentGroup = document.createElement('div');
    notesAppointmentGroup.className = 'input-group mb-3';
    editedElements.append(notesAppointmentGroup);

    const spanNotesAppointmentElement = document.createElement('span');
    spanNotesAppointmentElement.className = 'input-group-text';
    spanNotesAppointmentElement.innerHTML = 'Notes';
    notesAppointmentGroup.append(spanNotesAppointmentElement);

    const inputNotesAppointmentElement = document.createElement('input');
    inputNotesAppointmentElement.type = 'text';    
    inputNotesAppointmentElement.className = 'form-control';
    inputNotesAppointmentElement.id = 'edit-appointment-notes';
    notesAppointmentGroup.append(inputNotesAppointmentElement);
    inputNotesAppointmentElement.value = notes;

    // div of 2 buttons
    const buttonsElement = document.createElement('div');
    buttonsElement.className = 'd-flex justify-content-evenly mb-2';
    parentElement.appendChild(buttonsElement)

    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn btn-delete m-2';
    cancelButton.type = 'button';
    cancelButton.innerHTML = 'Cancel'
    buttonsElement.append(cancelButton);
    cancelButton.addEventListener('click', () => cancelEditAppointment());

    const saveButton = document.createElement('button');
    saveButton.className = 'btn m-2';
    saveButton.type = 'button';
    saveButton.innerHTML = 'Save'
    buttonsElement.append(saveButton);
    saveButton.addEventListener('click', () => editAppointment(appointment_id));  
}


function editAppointment(appointment_id) {

    const changed_doctor_name = document.getElementById('edit-appointment-name').value;
    const changed_date_visit = document.getElementById('edit-appointment-date').value;
    const changed_time_visit = document.getElementById('edit-appointment-time').value;
    const changed_place_visit = document.getElementById('edit-appointment-place').value;
    const changed_notes = document.getElementById('edit-appointment-notes').value;

    fetch(`edit_appointment/${appointment_id}`, {
        method: 'POST',
        body: JSON.stringify({
            changed_doctor_name: changed_doctor_name,
            changed_date_visit: changed_date_visit,
            changed_time_visit: changed_time_visit,
            changed_place_visit: changed_place_visit,
            changed_notes: changed_notes
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.message) {

            const messageElement = document.createElement('div');
            messageElement.className = 'alert shadow alert-success mt-4';
            messageElement.role = 'alert';
            document.getElementById('display-items').prepend(messageElement);
            messageElement.innerHTML = data.message;

            setTimeout(() => {
                messageElement.innerHTML = '';
                window.location.replace(window.location.href);
            }, 5000)
        }
    })
    .catch(error => {
        console.log('Error:', error);
    })
}


function cancelEditAppointment() {

    document.getElementById('edit-appointment').remove();
}