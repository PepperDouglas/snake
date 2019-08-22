export function getScoreTable(){
    if (localStorage.getItem('scoreTable') === null){
        return [{score: 12}, {score: 8}, {score: 6}, {score: 2}];
    } else {
        let str = localStorage.getItem('scoreTable');
        return JSON.parse(str);
    }   
};

export function putScoreTable(table){
    let jsoned = JSON.stringify(table);
    localStorage.setItem('scoreTable', jsoned);
}