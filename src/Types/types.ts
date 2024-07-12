
export interface Metric {
    name: string;
    value: number;
}
  
export interface CoLifePreferences {
    nightOwl: Metric;
    cleanliness: Metric;
    noiseLevel: Metric;
    alcohol: Metric;
    smoking: Metric;
}
  