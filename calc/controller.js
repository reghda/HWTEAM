const clickOnNumber = e => {
    if (!e || !e.target.innerHTML) {
        return;
    }

    if (model.result !== null) {
        setToModel(model.result, 'firstValue');
        setToModel(null, 'result');
        document.getElementById('inputField').value = "";
    }

    let inputString = document.getElementById('inputField').value;

    //проверка на наличие точки в строке
    if (e.target.innerHTML === '.' && inputString.indexOf('.', 0) >= 0) {
        return;
    }

    //проверка на 0 вначале строки, если вначале стоит 0 и при этом длинна строки не более 1, то выходим из функции
    if (e.target.innerHTML === '0' && inputString.charAt(0) === '0' && inputString.length <= 1) {
        return;
    }

    //не больше 8 чисел в поле ввода
    if (inputString.length >= 8) {
        return;
    }

    //начальное число всегда 0, но при вводе чего-то другого меняется
    if (inputString.charAt(0) === '0' && e.target.innerHTML !== '0' && e.target.innerHTML !== '.' && inputString.length <= 1) {
        document.getElementById('inputField').value = "";
    }

    document.getElementById('inputField').value += e.target.innerHTML;
};

const Clear = () => {
    setToModel(null, 'firstValue');
    setToModel(null, 'secondValue');
    setToModel(null, 'result');
    setToModel('', 'sign');
    document.getElementById('inputField').value = '0';
};

const clickOnSign = e => {
    if (!e || !e.target.innerHTML) {
        return;
    }

    model.sign === ''
        ? setToModel(document.getElementById('inputField').value, 'firstValue')
        : setToModel(document.getElementById('inputField').value, 'secondValue');

    document.getElementById('inputField').value = "";

    //если знак = то просто считает, если знак иной, то считает учитывая новый знак
    if (e.target.innerHTML !== '=') {
        makeResult();
        setToModel(e.target.innerHTML, 'sign');
    } else {
        makeResult();
    }
};

const makeResult = () => {
    if (model.sign === '' || model.firstValue === null || model.secondValue === null) {
        return;
    }

    const result = checkSign(model);

    if (result || result >= 0){
        setToModel( Number(result.toFixed(3)), 'result');
        document.getElementById('inputField').value = Number(result.toFixed(3));
        //очищаю для второго цикла расчетов
        setToModel(null, 'firstValue');
        setToModel(null, 'secondValue');
        setToModel('', 'sign');
    }
};

const checkSign = (model) => {
    let result = null;

    switch (model.sign) {
        case '+' :
            result = Number(model.firstValue) + Number(model.secondValue);
            break;
        case '-' :
            result = Number(model.firstValue) - Number(model.secondValue);
            break;
        case '×' :
            result = Number(model.firstValue) * Number(model.secondValue);
            break;
        case '÷' :
            result = Number(model.firstValue) / Number(model.secondValue);
            break;
    }

    return result;
};

const setToModel = (value, field) => {
    model[field] = value;
};

const init = () => {
    input = document.getElementById('inputField');
    clearInput = document.getElementById('clearButton');
    signButtons = document.getElementsByClassName('sign-button');
    numberButtons = document.getElementsByClassName('number-button');

    for (let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener('click', clickOnNumber, false);
    }

    for (let i = 0; i < signButtons.length; i++) {
        signButtons[i].addEventListener('click', clickOnSign, false);
    }

    clearInput.addEventListener('click', Clear, false);
};

init();