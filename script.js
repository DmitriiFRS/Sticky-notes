function notes() {
 const colors = {
      yellow: '#97c248',
      white: '#dbebbd',
      aquamarine: '#36ca9e',
      purple: '#b60f5d',
      green: '#09a538',
      red: '#e28c72',
      fiolet: '#9728b9',
      orange: '#c7bb0e',
   }
   let saveObj = JSON.parse(localStorage.getItem('notes')) || {};
   let saveCount = localStorage.getItem('count') || 0;
   const colorsArr = Object.values(colors);
   const add = document.querySelector(".modal__accept");
   const modalWindow = document.querySelector(".modal");
   const openAdd = document.querySelector(".notes__add");
   const deleteBtn = document.querySelector(".notes__remove");
   const input = document.querySelector(".modal__input");
   const notesSection = document.querySelector(".notes__container");
   let deleteCount = 0;
   if (Object.keys(saveObj).length !== 0) {
      for (let key in saveObj) {
         const newElem = document.createElement('div');
         const textElem = document.createElement('p');
         newElem.className = 'notes-item';
         textElem.className = 'notes-text';
         input.value = saveObj[key];
         notesSection.appendChild(newElem);
         newElem.appendChild(textElem);
         textElem.textContent = input.value;
         input.value = '';
         newElem.style.backgroundColor = colorsArr[Math.floor(Math.random() * colorsArr.length)];
         newElem.style.transform = `rotate(${Math.floor(Math.random() * 11) - 5}deg)`;
      }
   }
   function deleteNote() {
      if (deleteCount > 0) {
         deleteCount--;
         deleteBtn.textContent = 'Удалить';
         return deleteCount;
      }
      else {
         deleteCount++;
         deleteBtn.textContent = 'Отменить';
         return deleteCount;
      }
   }
   function openModal(e) {
      e.preventDefault();
      modalWindow.style.display = 'flex';
      if (deleteCount == 1) {
         deleteCount--;
         deleteBtn.textContent = 'Удалить';
         return deleteCount;
      }
   }
   function addNotes() {
      const newElem = document.createElement('div');
      const textElem = document.createElement('p');
      newElem.className = 'notes-item';
      textElem.className = 'notes-text';
      saveCount++;
      saveObj[saveCount] = input.value;
      console.log(saveObj);
      localStorage.setItem('count', saveCount);
      localStorage.setItem('notes', JSON.stringify(saveObj));
      if (input.value == '') {
         return;
      }
      else {
      notesSection.appendChild(newElem);
      newElem.appendChild(textElem);
      textElem.textContent = input.value;
      input.value = '';
      newElem.style.backgroundColor = colorsArr[Math.floor(Math.random() * colorsArr.length)];
      newElem.style.transform = `rotate(${Math.floor(Math.random() * 11) - 5}deg)`;
      }
   }
   function closeModal(e) {
      if (e.target == modalWindow) {
         e.preventDefault();
         modalWindow.style.display = 'none';
      }
   }
   function removeNote(e) {
      if (deleteCount == 1) {
         if (e.target.closest('.notes-item')) {
            console.log(e.target.closest('.notes-item').children[0].innerHTML)
            for (let key in saveObj) {
               if (saveObj[key] === e.target.closest('.notes-item').children[0].innerHTML) {
                  delete saveObj[key];
                  saveCount--;
                  break;
               }
            }
            let count = 0;
            let newObj = {};
            for (let key in saveObj) {
               count++;
               newObj[count] = saveObj[key];
            }
            console.log(newObj)
            localStorage.clear();
            localStorage.setItem('count', saveCount);
            localStorage.setItem('notes', JSON.stringify(newObj));
            e.target.closest('.notes-item').remove();
         }
      }
      else return;
   }
   openAdd.addEventListener('click', openModal);
   modalWindow.addEventListener('mouseup', closeModal);
   add.addEventListener('click', addNotes);
   deleteBtn.addEventListener('click', deleteNote);
   notesSection.addEventListener('click', removeNote);
}

notes();