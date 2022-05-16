import { vizualization } from './visualization.js'
import { sortAlgorithm } from './script.js'

async function selectionSort() {
    const columns = sortAlgorithm.columns;
    sortAlgorithm.isSorting = true;
    let lastSortedElement = columns.length;

    while (sortAlgorithm.isSorting) {

        let max = 0;
        await vizualization.makeSpecial(max);
        for (let i = 0; i < lastSortedElement; i++) {
            if (i) {
                vizualization.unselectColumns(i - 1);
            }
            await vizualization.selectColumns(i);

            if (columns[i].order > columns[max].order) {
                vizualization.unselectColumns(i);
                vizualization.removeSpecial(max);
                max = i;
                await vizualization.makeSpecial(max);
            }
        }

        vizualization.unselectColumns(lastSortedElement - 1);
        await vizualization.swapColumns(lastSortedElement - 1, max);
        vizualization.removeSpecial(lastSortedElement - 1);
        await vizualization.columnSorted(lastSortedElement - 1);

        lastSortedElement--;
        if (lastSortedElement <= 1) {
            await vizualization.columnSorted(0);
            sortAlgorithm.isSorting = false;
        }
    }
}

export { selectionSort }