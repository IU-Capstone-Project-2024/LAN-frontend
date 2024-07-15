
export interface Metric {
    id: number;
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
  