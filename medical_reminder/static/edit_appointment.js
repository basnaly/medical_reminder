
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


function displayEditAppointment(medicine_id, medicine_name, medicine_form, medicine_strength, medicine_unit, medicine_frequency) {

    const exsistingMedicine = document.getElementById('edit-medicine');
    if (exsistingMedicine) {
        exsistingMedicine.remove();
    }

    // div of the edited table
    const parentElement = document.createElement('div');
    parentElement.className = 'd-flex flex-column border rounded-3 p-3';
    parentElement.id = 'edit-medicine';
    document.querySelector('#edit-medicine-table').append(parentElement);

    // div of the all elements
    const editedElements = document.createElement('div');
    editedElements.className = 'd-flex flex-column';
    parentElement.append(editedElements);

    // div of the name
    const nameMedicineGroup = document.createElement('div');
    nameMedicineGroup.className = 'input-group mb-3';
    editedElements.append(nameMedicineGroup);

    const spanNameMedicineElement = document.createElement('span');
    spanNameMedicineElement.className = 'input-group-text';
    spanNameMedicineElement.innerHTML = 'Name';
    nameMedicineGroup.append(spanNameMedicineElement);

    const inputNameMedicineElement = document.createElement('input');
    inputNameMedicineElement.type = 'text';    
    inputNameMedicineElement.className = 'form-control';
    inputNameMedicineElement.id = 'edit-medicine-name';
    nameMedicineGroup.append(inputNameMedicineElement);
    inputNameMedicineElement.focus();
    inputNameMedicineElement.value = medicine_name;

    // div of the form
    const formMedicineGroup = document.createElement('div');
    formMedicineGroup.className = 'input-group';
    editedElements.append(formMedicineGroup);

    const spanFormMedicineElement = document.createElement('span');
    spanFormMedicineElement.className = 'input-group-text mb-3';
    spanFormMedicineElement.innerHTML = 'Form';
    formMedicineGroup.append(spanFormMedicineElement);

    const selectFormMedicineElement = document.createElement('select');
    for (let i = 0; i < FORM.length; i++) {
        let option = FORM[i];
        let element = document.createElement('option');
        element.textContent = option;
        element.value = option;
        selectFormMedicineElement.appendChild(element);
    }
    selectFormMedicineElement.className = 'form-control select-data mb-3';
    selectFormMedicineElement.id = 'edit-medicine-form';
    formMedicineGroup.append(selectFormMedicineElement);
    selectFormMedicineElement.value = medicine_form;

    // div of the strength
    const strengthMedicineGroup = document.createElement('div');
    strengthMedicineGroup.className = 'input-group mb-3';
    editedElements.append(strengthMedicineGroup);

    const spanStrengthMedicineElement = document.createElement('span');
    spanStrengthMedicineElement.className = 'input-group-text';
    spanStrengthMedicineElement.innerHTML = 'Strength';
    strengthMedicineGroup.append(spanStrengthMedicineElement);

    const inputStrengthMedicineElement = document.createElement('input');
    inputStrengthMedicineElement.type = 'number';    
    inputStrengthMedicineElement.className = 'form-control';
    inputStrengthMedicineElement.id = 'edit-medicine-strength';
    strengthMedicineGroup.append(inputStrengthMedicineElement);
    inputStrengthMedicineElement.value = medicine_strength;

    // div of the unit
    const unitMedicineGroup = document.createElement('div');
    unitMedicineGroup.className = 'input-group';
    editedElements.append(unitMedicineGroup);

    const spanUnitMedicineElement = document.createElement('span');
    spanUnitMedicineElement.className = 'input-group-text mb-3';
    spanUnitMedicineElement.innerHTML = 'Unit';
    unitMedicineGroup.append(spanUnitMedicineElement);

    const selectUnitMedicineElement = document.createElement('select');
    for (let i = 0; i < UNIT.length; i++) {
        let option = UNIT[i];
        let element = document.createElement('option');
        element.textContent = option;
        element.value = option;
        selectUnitMedicineElement.appendChild(element);
    }
    selectUnitMedicineElement.className = 'form-control select-data mb-3';
    selectUnitMedicineElement.id = 'edit-medicine-unit';
    unitMedicineGroup.append(selectUnitMedicineElement);
    selectUnitMedicineElement.value = medicine_unit;

    // div of the frequency
    const frequencyMedicineGroup = document.createElement('div');
    frequencyMedicineGroup.className = 'input-group mb-3';
    editedElements.append(frequencyMedicineGroup);

    const spanFrequencyMedicineElement = document.createElement('span');
    spanFrequencyMedicineElement.className = 'input-group-text';
    spanFrequencyMedicineElement.innerHTML = 'Frequency';
    frequencyMedicineGroup.append(spanFrequencyMedicineElement);

    const inputFrequencyMedicineElement = document.createElement('input');
    inputFrequencyMedicineElement.type = 'number';    
    inputFrequencyMedicineElement.className = 'form-control';
    inputFrequencyMedicineElement.id = 'edit-medicine-frequency';
    frequencyMedicineGroup.append(inputFrequencyMedicineElement);
    inputFrequencyMedicineElement.value = medicine_frequency;

    // div of 2 buttons
    const buttonsElement = document.createElement('div');
    buttonsElement.className = 'd-flex justify-content-evenly mb-2';
    parentElement.appendChild(buttonsElement)

    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn btn-delete m-2';
    cancelButton.type = 'button';
    cancelButton.innerHTML = 'Cancel'
    buttonsElement.append(cancelButton);
    cancelButton.addEventListener('click', () => cancelEditMedicine());

    const saveButton = document.createElement('button');
    saveButton.className = 'btn m-2';
    saveButton.type = 'button';
    saveButton.innerHTML = 'Save'
    buttonsElement.append(saveButton);
    saveButton.addEventListener('click', () => editMedicine(medicine_id));  
}


function editAppointment(appointment_id) {

    const changed_doctor_name = document.getElementById('edit-doctor_name').value;
    const changed_date_visit = document.getElementById('edit-date_visit').value;
    const changed_time_visit = document.getElementById('edit-time_visit').value;
    const changed_place_visit = document.getElementById('edit-place_visit').value;
    const changed_notes = document.getElementById('edit-notes').value;

    fetch(`edit_appointment/$appointment_id}`, {
        method: 'POST',
        body: JSON.stringify({
            changed_doctor_name: changed_doctor_name,
            changed_changed_date_visit: changed_changed_date_visit,
            changed_medicine_strength: changed_medicine_strength,
            changed_medicine_unit: changed_medicine_unit,
            changed_medicine_frequency: changed_medicine_frequency
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


function cancelEditMedicine() {

    document.getElementById('edit-medicine').remove();
}