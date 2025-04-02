export type PomodoroStatsType = {
  pomodoros:
    | {
        id: string;
        createdAt: Date;
        userId: string;
        finished: Date;
      }[]
    | undefined;
};

export type PomodoroTimerListType = {
  sortedDates: string[];
  groupedByDate: Record<
    string,
    {
      id: string;
      createdAt: Date;
      userId: string;
      finished: Date;
    }[]
  >;
};

export type PomodoroType = {
  id: string;
  createdAt: Date;
  userId: string;
  finished: Date;
};

export type PomodorosType = PomodoroType[];

export type PomodorosPage = {
  pomodoros: PomodorosType;
  nextCursor: string | null;
};

export type PomodoroTotal = {
  totalHours: number;
};
