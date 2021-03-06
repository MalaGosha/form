const username = document.querySelector('#userName');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popupSend = document.querySelector('.popUpSend');
const wrapper = document.querySelector('.wrapper');
const openPopup = document.querySelector('.open-button');

openPopup.addEventListener('click', e => {
  popupForm();
});

const popupForm = () => {
  wrapper.style.display = 'block';
  openPopup.style.display = 'none';
}


// UKAZYWANIE BŁĘDU
// argument INPUTEL z funkcji showError odnosi sie do każdej zmiennej, pojedynczego inputa, elememtu a nie do tablicy
// argument MSG przechowuje placeholder

const showError = (inputEl, msg) => {
  const formBox = inputEl.parentElement; // rodzicem inputa jest div o class=form-box i przypisz do niego zmienną formBox
  const errorMsg = formBox.querySelector('.error-text');

  formBox.classList.add('error'); // dodaje klasę error do div o class=form-box
  errorMsg.textContent = msg;
}

const clearError = inputEl => {
  const formBox = inputEl.parentElement;
  formBox.classList.remove('error');
}


// UZUPEŁNIENIE FORMULARZA
// argument INPUTLISTA z funkcji "checkform" przechowuje tablicę z naszymi inputami --> to lista
// argument EL odnosi się do każdej zmiennej ktorą umieściliśmy w tablicy --> to element listy

const checkForm = inputList => {

  inputList.forEach(el => {
    if (el.value === '') {
      showError(el, el.placeholder) //el - zwraca całego inputa a el.placeholder zwraca zawartość placeholdera
    } else {
      clearError(el) // ttlko 1 argument bo tylko chcemy odwołać się do input
    }
  })

}


// WYPEŁNIENIE INPUT HASŁA
const checkLength = (input, min) => {
  if (input.value.length < min) {
    showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} powinno składać się z min. ${min} znaków.`);
  }
}

const checkPassword = (password, password2) => {
  if (password.value !== password2.value) {
    showError(password2, "Ups! Hasła do siebie nie pasują!")
  }
}


//SPRAWDZENIE MAILA
const checkMail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value)) {
    clearError(email)
  } else {
showError(email, 'Wprowadź prawidłowy mail')
  }
};


// WYSYŁANIE FORMULARZA
const checkErrors = () => {
  const allInputs = document.querySelectorAll('.form-box');
  let errorCount = 0;

  allInputs.forEach(el => {
    if (el.classList.contains('error')) {
      errorCount++;
    }
  })

  console.log(errorCount);

  if (errorCount === 0){
    popupSend.classList.add('show-popup');
  }
}
console.log(popupSend);



// PRZYCISK WYŚLIJ
sendBtn.addEventListener('click', e => {
  e.preventDefault(); // by zapobiec działaniu wewnętrzego przycisku formluarza wyślij i przeładowaniu strony

  checkForm([username, password, password2, email]);
  checkLength(username, 3);
  checkLength(password, 5);
  checkPassword(password, password2);
  checkMail(email);
  checkErrors();
});


// PRZYCISK CLEAR
clearBtn.addEventListener('click', e => {
  e.preventDefault();

  [username, password, password2, email].forEach(el => {
    el.value = '';
    clearError(el);
  })
});

/*

LUB
const clearForm = (e) => {
  e.preventDefault()
}
clearBtn.addEventListener('click', clearForm());

LUB
clearBtn.onclick = function {
  e.preventDefault()
}

 */





