const fs = require('fs');
const { AudioContext } = require('web-audio-api');

module.exports = class MP3 {
    constructor(fileName, callback) {
        const mp3Data = fs.readFileSync(fileName).buffer;

        // Create an AudioContext
        const audioContext = new AudioContext();

        // Decode the MP3 data to an AudioBuffer
        const self = this;
        audioContext.decodeAudioData(mp3Data, function (audioBuffer) {
            // Convert the AudioBuffer to a frequency array
            const frequencyArray = getFrequencyArray(audioBuffer);
            callback(frequencyArray);

        });

        // Function to convert an AudioBuffer to a frequency array
        function getFrequencyArray(audioBuffer) {
            const { numberOfChannels, length, sampleRate } = audioBuffer;
            const channelData = [];
            const frequencyArray = [];

            // Get the channel data from each channel of the audio buffer
            for (let channel = 0; channel < numberOfChannels; channel++) {
                channelData[channel] = audioBuffer.getChannelData(channel);
            }

            // Calculate the frequency for each sample
            for (let sample = 0; sample < length; sample++) {
                let sum = 0;

                // Sum the channel data for each channel
                for (let channel = 0; channel < numberOfChannels; channel++) {
                    sum += channelData[channel][sample];
                }

                // Calculate the frequency as the average of the absolute channel data
                const average = sum / numberOfChannels;
                const frequency = Math.abs(average);
                frequencyArray.push(frequency);
            }

            return frequencyArray;
        }
    }
}