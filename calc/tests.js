describe("Calc", () => {

    describe("checkSign", () => {
        const dataTest = [
            {
                model: {
                    firstValue: 1,
                    secondValue: 2,
                    sign: '+',
                },
                expected: 3,
            },
            {
                model: {
                    firstValue: 1,
                    secondValue: 2,
                    sign: '-',
                },
                expected: -1,
            },
            {
                model: {
                    firstValue: 3,
                    secondValue: 2,
                    sign: '×',
                },
                expected: 6,
            },
            {
                model: {
                    firstValue: 8,
                    secondValue: 2,
                    sign: '÷',
                },
                expected: 4,
            },
            {
                model: {
                    firstValue: 2,
                    secondValue: 0,
                    sign: '÷',
                },
                expected: Infinity,
            },
        ];

        dataTest.forEach(data => {
            const {
                model,
                expected,
            } = data;

            const actual = checkSign(model);

            it(`Should return ${expected} when firstValue = ${model.firstValue} and secondValue = ${model.secondValue} and sign was ${model.sign}`, () => {
                assert.strictEqual(actual, expected);
            });
            Clear();
        });
    });

    describe("setToModel", () => {
        const dataTest = [
            {
                value: 2,
                field: 'firstValue',
                expected: 2,
            },
            {
                value: 4,
                field: 'secondValue',
                expected: 4,
            },
            {
                value: '+',
                field: 'sign',
                expected: '+',
            },
            {
                value: 4,
                field: 'result',
                expected: 4,
            },
        ];

        dataTest.forEach(data => {
            const {
                value,
                field,
                expected,
                } = data;

            setToModel(value, field);
            const actual = model[field];

            it(`Should return ${expected} when input data was value = ${value} and field = ${field}`, () => {
                assert.strictEqual(actual, expected)
            });
            Clear();
        });
    });

    describe("makeResult", () => {
        const dataTest = [
            {
                model: {
                    firstValue: null,
                    secondValue: 2,
                    sign: '+',
                },
                expected: void 0,
            },
            {
                model: {
                    firstValue: 1,
                    secondValue: null,
                    sign: '+',
                },
                expected: void 0,
            },
            {
                model: {
                    firstValue: 1,
                    secondValue: 2,
                    sign: '',
                },
                expected: void 0,
            },
        ];

        dataTest.forEach(data => {
            const {
                model,
                expected,
            } = data;


            const actual = makeResult();

            it(`Should return ${expected} when input data was firstValue = ${model.firstValue}, secondValue = ${model.secondValue} and sign = ${model.sign}`, () => {
                assert.strictEqual(actual, expected)
            });
            Clear();
        });
    });

    describe("allTogether", () => {
        dataTest = [
            {
                array: [],
                expected: '0'
            },
            {
                array: [1],
                expected: '1'
            },
            {
                array: [1, 2],
                expected: '12'
            },
            {
                array: [1, 2, 3, 4, 5],
                expected: '12345'
            },
            {
                array: [1, '+', 1, '='],
                expected: '2'
            },
            {
                array: [1, '+', 1, '+'],
                expected: '2'
            },
            {
                array: [1, '+', 0, '.', 2, 5, '='],
                expected: '1.25'
            },
            {
                array: [1, '+', 0, '.', '.', 2, 5, '='],
                expected: '1.25'
            },
            {
                array: ['+', 5, '='],
                expected: '5'
            },
            {
                array: [1, 2, 5, '+', 0, '.', 7, 3, '+', 0, '.', 2, 7, '='],
                expected: '126'
            },
            {
                array: [1, 2, 5, '+', 0, 0, 0, '.', 7, 3, '+', 0, 0, 0, 0, '.', 2, 7, '='],
                expected: '126'
            },
            {
                array: [1, '-', 1, '='],
                expected: '0'
            },
            {
                array: [1, '-', 1, '+'],
                expected: '0'
            },
            {
                array: [1, '-', 0, '.', 2, 5, '='],
                expected: '0.75'
            },
            {
                array: [1, '-', 0, 0, 0, 0, '.', '.', 2, 5, '='],
                expected: '0.75'
            },
            {
                array: ['-', 5, '='],
                expected: '-5'
            },
            {
                array: [1, 2, 5, '-', 0, '.', 7, 3, '-', 0, '.', 2, 7, '='],
                expected: '124'
            },
            {
                array: [1, 2, 5, '-', 0, 0, 0, '.', 7, 3, '-', 0, 0, 0, 0, '.', 2, 7, '-'],
                expected: '124'
            },
            {
                array: [1, '*', 1, '='],
                expected: '1'
            },
            {
                array: ['-', 1, '*', 1, '+'],
                expected: '-1'
            },
            {
                array: [1, '*', 0, '.', 2, 5, '='],
                expected: '0.25'
            },
            {
                array: [1, '*', 0, 0, 0, 0, '.', '.', 2, 5, '='],
                expected: '0.25'
            },
            {
                array: ['*', 5, '='],
                expected: '0'
            },
            {
                array: [1, 2, 5, '-', 0, '.', 7, 3, '-', 0, '.', 2, 7, '='],
                expected: '124'
            },
            {
                array: [1, 2, 5, '-', 0, 0, 0, '.', 7, 3, '-', 0, 0, 0, 0, '.', 2, 7, '-'],
                expected: '124'
            },
            {
                array: [1, '/', 1, '='],
                expected: '1'
            },
            {
                array: ['-', 1, '/', 1, '+'],
                expected: '-1'
            },
            {
                array: [2, '/', 1, '='],
                expected: '2'
            },
            {
                array: [3, 0, '/', 2, '='],
                expected: '15'
            },
            {
                array: ['/', 5, '='],
                expected: '0'
            },
            {
                array: [1, 0, 0, '/', 2, 5, '='],
                expected: '4'
            },
            {
                array: [1, '+', 1, '*', 4, '/', 2, '='],
                expected: '4'
            },
            {
                array: ['-', 1, '*', 5, '+', 1, 0, '/', 3, '='],
                expected: '1.667'
            },
            {
                array: [2, '/', 4, '+', 0, '.', 5, '.', 2, 5, '*', 2, '='],
                expected: '2.05'
            },
            {
                array: [3, 0, '/', 2, '*', 6, 0, 1, '+', 2, '.', 1, 0, 3, '/', 2, '='],
                expected: '4508.551'
            },
            {
                array: [5, '-', 5, '*', 2, 0, '-', 4, 0, '/', 2, '='],
                expected: '-20'
            },
        ];

        dataTest.forEach(data => {
            const {array, expected} = data;

            for (let i = 0; i < array.length; i++) {
                document.getElementsByName(array[i])[0].click();
            }

            const actual = document.getElementById('inputField').value;

            it(`Should return ${expected} when input data was ${array} `, () => {
                assert.strictEqual(actual, expected)
            });
            Clear();
        })
    });
});