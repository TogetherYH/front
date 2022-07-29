export interface ResultType {
  id: string;
  scaleId: string;
  scaleName: string;
  publishId: string;
  userId: string;
  username: string;
  realName: string;
  rawScore: number;
  standardScore: number;
  averageScore: number;
  warningLevel: string;
  startTime: string;
}

export interface ZipProgress {
  current: number;
  total: number;
  step: string;
}
