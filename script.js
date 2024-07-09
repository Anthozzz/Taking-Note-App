document.addEventListener('DOMContentLoaded', function () {
    const noteForm = document.getElementById('note-form');
    const notesContainer = document.getElementById('notes-container');

    noteForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        // Get form values
        const subject = document.getElementById('subject').value;
        const note = document.getElementById('note').value;

        // Create a new note card
        const card = document.createElement('div');
        card.className = 'col-md-4 col-sm-6 col-12 mb-4';
        card.innerHTML = `
            <div class="card" style="width: 100%;">
                <div class="card-body">
                    <h5 class="card-title">${subject}</h5>
                    <p class="card-text">${note}</p>
                    <button class="btn btn-danger delete-note">Delete</button>
                </div>
            </div>
        `;

        // Add the card to the notes container
        notesContainer.appendChild(card);

        // Save the note to local storage
        saveNoteToLocalStorage(subject, note);

        // Clear the form fields
        noteForm.reset();
    });

    // Load notes from local storage
    loadNotesFromLocalStorage();

    // Delete note
    notesContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-note')) {
            const card = event.target.closest('.col-md-4');
            const subject = card.querySelector('.card-title').textContent;
            deleteNoteFromLocalStorage(subject);
            card.remove();
        }
    });

    // Save note to local storage
    function saveNoteToLocalStorage(subject, note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ subject, note });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Load notes from local storage
    function loadNotesFromLocalStorage() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => {
            const card = document.createElement('div');
            card.className = 'col-md-4 col-sm-6 col-12 mb-4';
            card.innerHTML = `
                <div class="card" style="width: 100%;">
                    <div class="card-body">
                        <h5 class="card-title">${note.subject}</h5>
                        <p class="card-text">${note.note}</p>
                        <button class="btn btn-danger delete-note">Delete</button>
                    </div>
                </div>
            `;
            notesContainer.appendChild(card);
        });
    }

    // Delete note from local storage
    function deleteNoteFromLocalStorage(subject) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note.subject !== subject);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
});
