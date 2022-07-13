function assignDataForm (data) {

    const inputList = document.querySelectorAll('input');

    for (let input of inputList) {
        input.value = data[input.name];
    }

}

function fieldTitle(field) {
    return field.split('-').map(field => field[0].toUpperCase()+field.substring(1)).join(' ');
}

function personFieldView(key, value) {
    const personField = document.createElement('div');

    const fieldLabel = document.createElement('label');
    fieldLabel.textContent = fieldTitle(key);

    const fieldP = document.createElement('p');
    fieldP.textContent = value.toString();
    fieldP.className = 'card-'+ key ;

    personField.appendChild(fieldLabel);
    personField.appendChild(fieldP);

    return personField;
}

function personDelete(index) {
    let personList = JSON.parse(localStorage.getItem('personList')) || [];

    const personListNew = personList.filter( (person, indexIn) => index !== indexIn);

    localStorage.setItem('personList', JSON.stringify(personListNew));

//    refresh = !refresh;
}

function personCardListView (person, index) {

    const personCardView = document.createElement('div');
    personCardView.className = 'submit-history-card';

    const personFieldListElement = Object.entries(person).map(([key, value]) => personFieldView(key, value));

    personFieldListElement.forEach(personField => {
        personCardView.appendChild(personField);
    })

    const buttonDelete = document.createElement('button');
    buttonDelete.textContent = 'Delete';
    buttonDelete.className = 'delete-button';
    buttonDelete.id=index;

    buttonDelete.addEventListener('click', () => {
        personDelete(index);
    });

    personCardView.appendChild(buttonDelete);

    return personCardView;
}

function assignPersonListHistoryView (personList) {

    const personHistory = document.getElementById('history');

    if (personHistory != null) {
        const personCardList = personList.map(personCardListView);

        personCardList.forEach( personElement => {
            personHistory.appendChild(personElement);
        })
    }
}

function refreshPage() {
    const personListStorageString = localStorage.getItem('personList');
    const personDataCapturedStorageString = localStorage.getItem('person');

    const personHistory = document.getElementById('history');
    const submitButton = document.getElementById('submit-button');

    if (personListStorageString && personListStorageString != JSON.stringify(personList) && personHistory) {
        personList = JSON.parse(personListStorageString);
        document.location.reload();
    } else if (personDataCapturedStorageString && personDataCapturedStorageString != JSON.stringify(personDataCaptured) && submitButton) {
        personDataCaptured = JSON.parse(personDataCapturedStorageString);
        document.location.reload();
    }
}

//let refresh = false;
let personList = [];
let personDataCaptured = {"first-name": "", "last-name": "", "email": "", "phone": "", "company": "", "address": "" }

window.onload = function() {

    personDataCaptured = JSON.parse(localStorage.getItem('person')) || { "first-name": "", "last-name": "", "email": "", "phone": "", "company": "", "address": "" }
    assignDataForm(personDataCaptured);

    const inputList = document.querySelectorAll('input');
    for (let input of inputList) {
        input.addEventListener('input', () => {
            personDataCaptured[input.name] = input.value;
            localStorage.setItem('person', JSON.stringify(personDataCaptured));
        })
    }

    personList = JSON.parse(localStorage.getItem('personList')) || [];

    const submitButton = document.getElementById('submit-button');

    if (submitButton != null) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            let person = { "first-name": "", "last-name": "", "email": "", "phone": "", "company": "", "address": "" }
            personDataCaptured = person;

            const inputList = document.querySelectorAll('input');
            for (let input of inputList) {
                person[input.name] = input.value;
            }

            personList.push(person);
            localStorage.setItem('personList', JSON.stringify(personList));

            personDataCaptured = { "first-name": "", "last-name": "", "email": "", "phone": "", "company": "", "address": "" };
            localStorage.setItem('person', JSON.stringify(personDataCaptured));

            assignDataForm(personDataCaptured);
            e.parent.reset();

        });
    }

    assignPersonListHistoryView(personList);

    setInterval(() => refreshPage(), 100);
}

