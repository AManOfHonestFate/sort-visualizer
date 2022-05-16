import { vizualization } from './visualization.js'
import { sortAlgorithm } from './script.js'

async function quickSort(leftBorder = 0 , rightBorder = sortAlgorithm.columns.length - 1) {
    const columns = sortAlgorithm.columns;

    const comp = columns[leftBorder];
    await vizualization.makeSpecial(leftBorder);

    let lastSortedElement = leftBorder;
    for (let i = leftBorder + 1; i <= rightBorder; i++) {
        await vizualization.selectColumns(i);
        if (columns[i].order < comp.order) {
            await vizualization.swapColumns(i, lastSortedElement + 1);
            lastSortedElement++;
            vizualization.unselectColumns(lastSortedElement);
            await vizualization.makeOrange(lastSortedElement);
        } else {
            vizualization.unselectColumns(i);
            await vizualization.makeBlue(i);
        }
    }

    await vizualization.swapColumns(leftBorder, lastSortedElement);
    vizualization.removeSpecial(lastSortedElement);
    await vizualization.columnSorted(lastSortedElement);
    for (let i = leftBorder; i <= rightBorder; i++) {
        vizualization.removeOrange(i);
        vizualization.removeBlue(i);
    }

    if (lastSortedElement - 1 > leftBorder) {
        await quickSort(leftBorder, lastSortedElement - 1);
    } else {
        await vizualization.columnSorted(leftBorder);
    }

    if (rightBorder > lastSortedElement + 1) {
        await quickSort(lastSortedElement + 1, rightBorder);
    } else {
        await vizualization.columnSorted(rightBorder);
    }
}

export { quickSort }