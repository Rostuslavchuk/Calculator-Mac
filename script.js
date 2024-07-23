document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const getSelected = document.querySelectorAll('.container .menu .button.selected');

    function resetStyles() {
        getSelected.forEach(btn => {
            btn.style.border = 'none';
            btn.style.borderBottom = '1px solid black';
            btn.style.borderRight = '1px solid black';
        });
    }

    getSelected.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();

            resetStyles();

            e.target.style.borderTop = '1px solid black';
            e.target.style.borderLeft = '1px solid black';
            e.target.style.borderBottom = '2px solid black';
        }
    });


    let firstNumber = '';
    let secondNumber = '';
    let action = '';
    let setMinus;
    let usePer;

    let res;

    let isFinish = false;
    let firstSet = false;

    const arrays = {
        signs: ['+', '-', 'x', '/'],
        writableSings: ['0', '9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '+/-', '%'],
        forReset: ['0', '9', '8', '7', '6', '5', '4', '3', '2', '1']
    };

    const parameters = {
        minus: document.getElementById('sign'),
        comma: document.getElementById('point'),
        equal: document.getElementById('equal'),
        ac: document.getElementById('ac'),
        per: document.getElementById('per'),
        input: document.getElementById('calc_line'),
    };


    function reset() {
        res = 0;
        firstNumber = '';
        secondNumber = '';
        action = '';
        usePer = false;
        setMinus = false;
        parameters.comma.style.pointerEvents = 'auto';
        parameters.input.textContent = '0';
        resetStyles();
    }
    function resetFirstValue() {
        firstNumber = '';
        usePer = false;
        setMinus = false;
        parameters.input.textContent = '0';
        parameters.comma.style.pointerEvents = 'auto';
    }
    function resetSecondValue() {
        res = 0;
        secondNumber = '';
        setMinus = false;
        usePer = false;

        if(firstNumber){
            parameters.input.textContent = firstNumber;
        }
        else{
            parameters.input.textContent = '0';
        }

        parameters.comma.style.pointerEvents = 'auto';
    }


    parameters.ac.onclick = reset;



    document.querySelector('.container').onclick = (e) => {

        if (!e.target.classList.contains('button')) return;


        let btn = e.target.textContent;



        if (arrays.writableSings.includes(btn)) {

            if ((secondNumber === '' && action === '') || res) {
                fillFirstValue();
            }

            if (firstNumber !== '' && action !== '' && firstSet) {
                fillSecondValue();
            }
        }


        if (arrays.signs.includes(btn)) {
            if(!firstNumber){
                return;
            }

            action = btn;
            firstSet = true;
            resetSecondValue();
        }



        if(btn === parameters.equal.textContent ){
            resetStyles();

            if(!secondNumber) secondNumber = firstNumber;

                    switch (action) {
                        case "+":
                            res = parseFloat(firstNumber) + parseFloat(secondNumber);
                            break;
                        case "-":
                            res = parseFloat(firstNumber) - parseFloat(secondNumber);
                            break;
                        case "x":
                            res = parseFloat(firstNumber) * parseFloat(secondNumber);
                            break;
                        case "/":
                            res = parseFloat(secondNumber) === 0 ? 'Це не число' :
                                parseFloat(firstNumber) / parseFloat(secondNumber);
                            break;
                    }


                if(JSON.stringify(res).includes('-')){
                    setMinus = true;
                }
                else{
                    setMinus = false;
                }

                btn='';
                fillFirstValue(res);
        }

        function fillFirstValue(res = null){
            firstSet = false;

            if(res !== null){
                firstNumber = res;
            }

            if(parameters.input.textContent.includes('0') &&
                parameters.input.textContent.startsWith('0') &&
                parameters.input.textContent.length > 1 &&
                !parameters.input.textContent.includes('0.')
            ){
                return;
            }

            if(btn === parameters.comma.textContent){
                if(setMinus){
                    resetFirstValue();
                    firstNumber = parameters.input.textContent + parameters.comma.textContent;
                    parameters.comma.style.pointerEvents = 'none';
                    btn='';
                }
                else{
                    firstNumber = parameters.input.textContent + btn;
                    parameters.comma.style.pointerEvents = 'none';
                    btn='';
                }
            }

            if(btn === parameters.minus.textContent && !setMinus && !parameters.input.textContent.includes('-')){
                if((
                        parameters.input.textContent.startsWith('0') &&
                        parameters.input.textContent.length >= 3 &&
                        parameters.input.textContent[parameters.input.textContent.length - 1] !== parameters.comma.textContent)
                    ||
                    (
                        !parameters.input.textContent.startsWith('0') &&
                        parameters.input.textContent.length >= 1 &&
                        parameters.input.textContent[parameters.input.textContent.length - 1] !== parameters.comma.textContent))
                {
                    firstNumber = '-' + parameters.input.textContent;
                    setMinus = true;
                    btn = '';
                }
                else{
                    return;
                }
            }
            if(btn === parameters.per.textContent){
                if(parameters.input.textContent !== '0'){
                    firstNumber = Number(parameters.input.textContent) / 100;
                    usePer = true;
                    btn = '';
                }
                else{
                    return;
                }
            }
            if(arrays.forReset.includes(btn) && (setMinus || usePer)){
                resetFirstValue();
            }

            if(setMinus && btn === parameters.minus.textContent){
                parameters.input.textContent = parameters.input.textContent.replace(/-/g, '');
                firstNumber = parameters.input.textContent;
                setMinus = false;
                btn = '';
            }

            if(firstNumber === '0' && parameters.input.textContent === '0' && arrays.forReset.includes(btn)){
                firstNumber = '';
                parameters.input.textContent = '';
            }

            firstNumber += btn;
            parameters.input.textContent = firstNumber;
        }



        function fillSecondValue(){

            if(btn === '0' && parameters.input.textContent === '0'){
                return;
            }

            if(btn === parameters.comma.textContent){

                if(setMinus || !secondNumber){
                    secondNumber = '0' + parameters.comma.textContent;
                    parameters.comma.style.pointerEvents = 'none';
                    btn='';
                }
                else{
                    secondNumber = parameters.input.textContent + btn;
                    parameters.comma.style.pointerEvents = 'none';
                    btn='';
                }
            }

            if(btn === parameters.minus.textContent && !setMinus && !parameters.input.textContent.includes('-')){
                if((
                        parameters.input.textContent.startsWith('0') &&
                        parameters.input.textContent.length >= 3 &&
                        parameters.input.textContent[parameters.input.textContent.length - 1] !== parameters.comma.textContent)
                    ||
                    (
                        !parameters.input.textContent.startsWith('0') &&
                        parameters.input.textContent.length >= 1 &&
                        parameters.input.textContent[parameters.input.textContent.length - 1] !== parameters.comma.textContent))
                {
                    secondNumber = '-' + parameters.input.textContent;
                    setMinus = true;
                    btn = '';
                }
                else{
                    return;
                }
            }
            if(parameters.input.textContent.includes('-') && btn === parameters.minus.textContent){
                parameters.input.textContent = parameters.input.textContent.replace(/-/g, '')
                secondNumber = parameters.input.textContent;
                setMinus=false;
                btn='';
            }

            if(btn === parameters.per.textContent){
                if(parameters.input.textContent !== '0'){
                    secondNumber = Number(parameters.input.textContent) / 100;
                    usePer = true;
                    btn = '';
                }
                else{
                    return;
                }
            }

            if(arrays.forReset.includes(btn) && (setMinus || usePer)){
                resetSecondValue();
            }


            if(secondNumber === '0' && parameters.input.textContent === '0' && arrays.forReset.includes(btn)){
                secondNumber = '';
                parameters.input.textContent = '';
            }


            secondNumber += btn;
            parameters.input.textContent = secondNumber;
        }
    };
});
