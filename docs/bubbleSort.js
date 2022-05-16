import { vizualization } from './visualization.js'
import { sortAlgorithm } from './script.js'

async function bubbleSort() {
    const columns = sortAlgorithm.columns;
    sortAlgorithm.isSorting = true;
    let lastSortedElement = columns.length;

    while (sortAlgorithm.isSorting) {   

        for (let i = 0; i < lastSortedElement - 1; i++) {

            if (i) {
                vizualization.unselectColumns(i - 1, i);
            }

            await vizualization.selectColumns(i, i + 1);

            if (columns[i].order > columns[i+1].order) {
                await vizualization.swapColumns(i, i + 1);
            }

            if (i === lastSortedElement - 2) {
                vizualization.unselectColumns(i, i + 1);
                await vizualization.columnSorted(i + 1);
            }
        }
        
        lastSortedElement--;
        if (lastSortedElement <= 1) {
            await vizualization.columnSorted(0);
            sortAlgorithm.isSorting = false;
        }
    }
}

export { bubbleSort }