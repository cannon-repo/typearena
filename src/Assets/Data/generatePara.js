import randomWords from "random-words";

export const generatePara = () => {
    const para = randomWords({exactly: 200});
    let sentence = [];
    for(let i=0;i<para.length;i++){
        for(let j=0;j<para[i].length;j++){
            sentence.push({alpha: para[i][j], cName: 'unvis', isCurr: false});
        } sentence.push({alpha: ' ', cName: 'unvis', isCurr: false});
    }
    return sentence;
}