"use strict";

console.log('max-path using dynpro');

var longesPaths = [];

main();

function main() {
    var matrixDimension = process.env.npm_package_config_matrixDimension;
    console.log('matrixDimension: ' + matrixDimension);
    var matrix = randomMatrix(matrixDimension);
    //copy without element-references to source-array
    var pathMatrix = matrix.map(function(array) {
        return array.slice();
    });

    firstColumn(matrix, pathMatrix, matrixDimension);
    firstLine(matrix, pathMatrix, matrixDimension);

    restOfMatrix(matrix, pathMatrix, matrixDimension);
    longestPathsAdd(pathMatrix[matrixDimension][matrixDimension]);

    longestPath(longesPaths);

}

function longestPath(longesPaths) {
    var max_of_array = Math.max.apply(Math, longesPaths);
    console.log('longesPath: ' + max_of_array);
}

function longestPathsAdd(pathLength) {
    if(!longesPaths.includes(pathLength)) {
        longesPaths.push(pathLength);
    }
}

function isPathBlock(numberLeft, numberUp) {
    return numberLeft + numberUp === 0;
}

function restOfMatrix(matrix, pathMatrix, matrixDimension) {
    for (var row = 1; row <= matrixDimension; row++) {
        for (var column = 1; column <= matrixDimension; column++) {
            var left = pathMatrix[row][column-1];
            var top = pathMatrix[row-1][column];
            if (isPathBlock(matrix[row][column-1], matrix[row-1][column])) {
                pathMatrix[row][column] = matrix[row][column];
                longestPathsAdd(maximum(left, top));
            } else if (matrix[row][column] !== 0) {
                pathMatrix[row][column] = matrix[row][column] + maximum(left, top);
            } else {
                longestPathsAdd(maximum(left, top));
                pathMatrix[row][column] = 0;
            }
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
        if (matrix[i][0] === 0) {
            if (matrix[i-1] !== undefined) {
                longestPathsAdd(pathMatrix[i-1][0]);
                pathMatrix[i][0] = 0;
            }
        } else {
            pathMatrix[i][0] = pathMatrix[i-1][0] + matrix[i][0];
        }
    }
}

function firstLine(matrix, pathMatrix, matrixDimension) {
    for (var i = 1; i <= matrixDimension; i++) {
        if (matrix[0][i] === 0) {
            if (matrix[0][i-1] !== undefined) {
                longestPathsAdd(pathMatrix[0][i-1]);
                pathMatrix[0][i] = 0;
            }
        } else {
            pathMatrix[0][i] = pathMatrix[0][i-1] + matrix[0][i];
        }
    }
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
    for (var row = 0; row <= matrixDimension; row++) {
        for (var column = 0; column <= matrixDimension; column++) {
            matrix[row][column] = randomOneOrZero();
        }
    }
    console.log('Matrix:');
    printMatrix(matrix);
    return matrix;
}
