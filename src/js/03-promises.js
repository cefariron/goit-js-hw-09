import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();

  const delayValue = Number(formEl.elements.delay.value);
  const stepValue = Number(formEl.elements.step.value);
  const amountValue = Number(formEl.elements.amount.value);

  for (let i = 0; i < amountValue; i += 1) {
    let promiseDelay = delayValue;

    if (i > 0) {
      promiseDelay = delayValue + stepValue * i;
    }

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Fullfilled promise ${position + 1} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Rejected promise ${position + 1} in ${delay}ms`
        );
      });
  }
}
