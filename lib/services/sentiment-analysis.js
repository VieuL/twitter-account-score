"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processingSentiment = void 0;
function processingSentiment(sentence) {
    const { SentimentManager } = require('node-nlp');
    const sentiment = new SentimentManager();
    return sentiment.process('en', sentence);
}
exports.processingSentiment = processingSentiment;
