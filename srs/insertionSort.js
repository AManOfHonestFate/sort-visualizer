import { vizualization } from './visualization.js'
import { sortAlgorithm } from './script.js'

async function insertionSort() {
    const columns = sortAlgorithm.columns;
    sortAlgorithm.isSorting = true;
    let lastSortedElement = 0;

    while (sortAlgorithm.isSorting) {

        let i = lastSortedElement;
        while (i > 0 && columns[i].order < columns[i-1].order) {
            await vizualization.selectColumns(i);
            await vizualization.swapColumns(i - 1, i);
            vizualization.unselectColumns(i - 1);
            i--;
        }
        await vizualization.columnSorted(i);

        lastSortedElement++;
        if (lastSortedElement === columns.length) {
            await vizualization.columnSorted(columns.length - 1);
            sortAlgorithm.isSorting = false;
        }
    }
}

export { insertionSort }