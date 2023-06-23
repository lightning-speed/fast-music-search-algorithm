const FrequencyMod = 1000;
const TimeIntervalPerBatch = 5000;//MS


module.exports = class Preprocessor {


    static process(songFrequencyArray) {
        const processedArray = new Array();
        const nArray = [];
        const n = parseInt(songFrequencyArray.length / TimeIntervalPerBatch)
        for (let i = 0; i < songFrequencyArray.length; i++) {
            let MaxFrequency = 0;

            const val = parseInt(songFrequencyArray[i] * FrequencyMod);

            //Comparing frequency gradient

            if (Math.abs(MaxFrequency - val) > 400) {
                processedArray.push(i);
                MaxFrequency = val;
            }
        }
        const finalArray = this.getOnlyDifference(processedArray);
        return finalArray;
    }
    static getOnlyDifference(processedArray) {
        const nArray = [];
        for (let i = 0; i < processedArray.length - 1; i++) {
            if (Math.abs(processedArray[i + 1] - processedArray[i]) > 60)
                nArray.push(Math.abs(processedArray[i + 1] - processedArray[i]));
        }
        return nArray;
    }
}