export interface SentimentResult {
    score: number;
    comparative: number;
    vote: string;
    numWords: number;
    numHits: number;
    type: string;
    language: string;

}

export function processingSentiment (sentence: string): Promise<SentimentResult> {
  const { SentimentManager } = require('node-nlp')
  const sentiment = new SentimentManager()
  return sentiment.process('en', sentence)
}
