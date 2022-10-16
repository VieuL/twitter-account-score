export interface SentimentResult {
    score: number;
    comparative: number;
    vote: string;
    numWords: number;
    numHits: number;
    type: string;
    language: string;
}
export declare function processingSentiment(sentence: string): Promise<SentimentResult>;
