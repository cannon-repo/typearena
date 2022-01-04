import randomWords from "random-words";

export const generateWordWithBlanks = () => {
    const word = randomWords();
        const wordArr = [];
        for (let i in word) {
            wordArr.push(word[i]);
        }

        const st = new Set();
        const ln = wordArr.length;
        let req = Math.min(Math.ceil(ln / 2) - 1, 3);
        req = Math.max(req, 1);
        const known = ln - req;

        if (req * 2 < known) {
            req++;
        }

        while (st.size !== req) {
            st.add(Math.floor(Math.random() * (ln - 2) + 1));
        }

        let blankWord = "";

        for (let i = 0; i < ln; i++) {
            if (st.has(i)) {
                blankWord += '_';
            } else {
                blankWord += wordArr[i];
            }
        }

        const obj = {"incompleteWord": blankWord, "completeWord": word };

        return obj;

}