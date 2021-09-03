const nav = document.querySelector('.navbar');
const addBtn = document.getElementById('add');
const themeBtn = document.getElementById('theme');

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) {
    notes.forEach(note => addNewNote(note));
}
// Change navbar collor on scroll
window.addEventListener('scroll',() => {
    if (window.pageYOffset > 0) {
        nav.style.backgroundColor = localStorage.getItem('mode') === 'bright' ? '#FEFFDE' :'#2B2E4A';
    } else {
        nav.style.backgroundColor = 'transparent';
    }
})


addBtn.addEventListener('click', () => addNewNote());

function addNewNote(text = '') {
    let toolClass = localStorage.getItem('mode') === 'bright' ? 'lightTools': '';
    let noteClass = localStorage.getItem('mode') === 'bright' ? 'lightNote': 'dark';

    const note = document.createElement('div');
    note.classList.add('note');
    note.classList.add(noteClass);


    note.innerHTML = `
    <div class="tools ${toolClass}">
        <button class="edit"><i id='ic' class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}" maxlength='300'></textarea>`
    
        const editBtn = note.querySelector('.edit');
        const delBtn = note.querySelector('.delete');
        const i = note.querySelector('#ic');
        const main = note.querySelector('.main');
        const textArea = note.querySelector('textarea');

        textArea.value = text;
        main.innerHTML = marked(text);
        delBtn.addEventListener('click',() => {
            note.remove();

            updateLS();
        })
        // When page loads
        let change = textArea.classList.contains('hidden') ? 'fas fa-edit' : 'fas fa-check-circle';
        i.className = change;
        // Edit btn
        editBtn.addEventListener('click',() => {
            main.classList.toggle('hidden');
            textArea.classList.toggle('hidden');

            let change = textArea.classList.contains('hidden') ? 'fas fa-edit' : 'fas fa-check-circle';
            i.className = change;
        })

        textArea.addEventListener('input',(e) => {
            const { value } = e.target;

            main.innerHTML = marked(value);

            updateLS();
        })
    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');
    const notes = [];

    notesText.forEach(note => notes.push(note.value));

    localStorage.setItem('notes', JSON.stringify(notes));
}


// Theme change and localStorage
document.addEventListener('DOMContentLoaded', (event) => {
    ((localStorage.getItem('mode') || 'dark') === 'bright') ? (document.querySelector('body').classList.add('light'),light()) : (document.querySelector('body').classList.remove('light'),removeLight())
  })

  
  function light() {
    const tls = document.querySelectorAll('.tools');
    const nots = document.querySelectorAll('.note');
      for (let i = 0; i < tls.length; i++) {
          tls[i].classList.add('lightTools');
      }
      for (let i = 0; i < nots.length; i++) {
          nots[i].classList.add('lightNote');        
      }
  }
  
  function removeLight() {
    const tls = document.querySelectorAll('.tools');
    const nots = document.querySelectorAll('.note');
      for (let i = 0; i < tls.length; i++) {
          tls[i].classList.remove('lightTools');
      }
      for (let i = 0; i < nots.length; i++) {
          nots[i].classList.remove('lightNote');        
      }
  }

themeBtn.addEventListener('click', () => {
    localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ? 'bright' : 'dark');
    localStorage.getItem('mode') === 'bright' ? (document.querySelector('body').classList.add('light'),light()) : (document.querySelector('body').classList.remove('light'),removeLight());
});




