export const preArr = [
    "ant",
    "cre",
    "exe", "ama", "sta", "cra", "mon", "exp", "pla", "com","and","dea"
];

export const getPrefix = () => {
    const len = preArr.length;
    const id = Math.floor(Math.random()*(len)) - 1;
    return preArr[id];
}