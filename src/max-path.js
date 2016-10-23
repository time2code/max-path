"use strict";

console.log('max-path using dynamic-programming');

//randomMatrix(process.env.npm_package_config_matrixDimension);
main();

function main() {
    var matrixDimension = process.env.npm_package_config_matrixDimension;
    console.log('matrixDimension: ' + matrixDimension);
    //var matrix = sampleMatrix();
    var matrix = randomMatrix(matrixDimension);
    //copy without element-references to source-array
    var pathMatrix = matrix.map(function(array) {
        return array.slice();
    });

    firstColumn(matrix, pathMatrix, matrixDimension);
    firstLine(matrix, pathMatrix, matrixDimension);
    fillAllTheRest(matrix, pathMatrix, matrixDimension);

    console.log(pathMatrix[matrixDimension][matrixDimension]);

}

function fillAllTheRest(matrix, pathMatrix, matrixDimension) {
    for (var i = 1; i <= matrixDimension; i++) {
        for (var idx = 1; idx <= matrixDimension; idx++) {
            pathMatrix[i][idx] = matrix[i][idx] + maximum(pathMatrix[i][idx-1], pathMatrix[i-1][idx])
        }
    }
    console.log('processed matrix:');
    printMatrix(pathMatrix);
}

function maximum(numberA, numberB) {
    return Math.max(numberA, numberB);
}

function firstColumn(matrix, pathMatrix, matrixDimension) {
    for (var i = 1; i <= matrixDimension; i++) {
        pathMatrix[i][0] = pathMatrix[i-1][0] + matrix[i][0];
    }
    console.log('firstColumn:');
    printMatrix(pathMatrix);
}

function firstLine(matrix, pathMatrix, matrixDimension) {
    for (var i = 1; i <= matrixDimension; i++) {
        pathMatrix[0][i] = pathMatrix[0][i-1] + matrix[0][i];
    }
    console.log('firstLine:');
    printMatrix(pathMatrix);
}

function printMatrix(matrix) {
    console.log(matrix.join("\n"));
    console.log('--------------');
}

function sampleMatrix() {
    return [
        [0, 1, 1, 0],
        [1, 0, 1, 1],
        [0, 1, 1, 0],
        [1, 0, 1, 1]
    ];
}

function randomOneOrZero() {
    return Math.round((Math.random()));
}

function randomMatrix(matrixDimension) {
    var matrix = [];
    for (var i = 0; i <= matrixDimension; i++) {
        matrix.push(new Array([]));
    }
    printMatrix(matrix);

    for (var i = 0; i <= matrixDimension; i++) {
        for (var idx = 0; idx <= matrixDimension; idx++) {
            matrix[i][idx] = randomOneOrZero();
        }
    }
    console.log('Matrix:');
    printMatrix(matrix);
    return matrix;
}
