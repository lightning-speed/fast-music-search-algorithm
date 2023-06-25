let FrequencyMod = 800;
const GradientThreshold = 400;
const MinimumDiff = 40;

module.exports = class Preprocessor {


    static process(songFrequencyArray) {
        const processedArray = new Array();
        for (let i = 0; i < songFrequencyArray.length; i++) {
            let MaxFrequency = 0;
            let val = songFrequencyArray[i] * FrequencyMod;


            val = parseInt(val);
            //Comparing frequency gradient

            if (Math.abs(MaxFrequency - val) > GradientThreshold) {
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

            if (Math.abs(processedArray[i + 1] - processedArray[i]) > MinimumDiff)
                nArray.push(Math.abs(processedArray[i + 1] - processedArray[i]));
        }
        return nArray;
    }
}