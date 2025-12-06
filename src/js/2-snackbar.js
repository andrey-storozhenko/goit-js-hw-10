// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

console.log("Snackbar");

const form = document.querySelector("form");


form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const delay =  form.elements.delay.value;
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => { 
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then(delay => iziToast.success({ message: `Fulfilled promise in ${delay}ms`, position: "topRight", }))
        .catch(error =>  iziToast.error({  message: `Rejected promise in ${delay}ms`, position: "topRight", }))

});


