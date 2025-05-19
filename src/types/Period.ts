export interface Period {
  id: number;
  createdAt: Date;
  startsAt: Date;
  endsAt: Date;
  isCurrent: boolean;
}