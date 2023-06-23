const ForwardElementLength = 10;
module.exports = class Hasher {
    static hash(proccessedFrequencyArray) {

        //Hashing each continous subset of processed data so our sample can be found from any point in time
        const hashes = new Array(proccessedFrequencyArray.length);
        for (let i = 0; i < hashes.length; i++) {
            let hash = 0;

            //CUSTOM HASH METHOD (IDK IF ITS CRASH PROOF)
            for (let j = 0; j < ForwardElementLength; j++) {
                const index = i + j
                if (index >= proccessedFrequencyArray.length)
                    break;
                hash *= 10;
                hash += proccessedFrequencyArray[index];
            }

            hashes[i] = hash + "a";

        }
        return hashes;

    }
}
