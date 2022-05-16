import { sortAlgorithm } from "./script.js";

const vizualization = {
    async swapColumns(a, b) {                               
        let t = sortAlgorithm.columns[a].column.style.order;                
        sortAlgorithm.columns[a].column.style.order =  sortAlgorithm.columns[b].column.style.order; 
        sortAlgorithm.columns[b].column.style.order = t;
        t = sortAlgorithm.columns[a];                
        sortAlgorithm.columns[a] =  sortAlgorithm.columns[b]; 
        sortAlgorithm.columns[b] = t;
        await sortAlgorithm.timer();                              
    },
    async selectColumns(a, b) {
        sortAlgorithm.columns[a].column.classList.add("column-current");
        sortAlgorithm.columns[b]?.column.classList.add("column-current");
        await sortAlgorithm.timer();
    },
    unselectColumns(a, b) {
        sortAlgorithm.columns[a].column.classList.remove("column-current");
        sortAlgorithm.columns[b]?.column.classList.remove("column-current");
    },
    async makeOrange(a) {
        sortAlgorithm.columns[a].column.classList.add("column-orange");
        await sortAlgorithm.timer();
    },
    removeOrange(a) {
        sortAlgorithm.columns[a].column.classList.remove("column-orange");
    },
    async makeBlue(a) {
        sortAlgorithm.columns[a].column.classList.add("column-blue");
        await sortAlgorithm.timer();
    },
    removeBlue(a) {
        sortAlgorithm.columns[a].column.classList.remove("column-blue");
    },
    async makeSpecial(a) {
        sortAlgorithm.columns[a].column.classList.add("column-special");
        await sortAlgorithm.timer();
    },
    removeSpecial(a) {
        sortAlgorithm.columns[a].column.classList.remove("column-special");
    },
    async columnSorted(a) {
        sortAlgorithm.columns[a].column.classList.add("column-sorted");
        await sortAlgorithm.timer();
    },
    removeSorted(a) {
        sortAlgorithm.columns[a].column.classList.remove("column-sorted");
    }
}

export { vizualization }