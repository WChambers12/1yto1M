export interface UserProfile {
  name: string;
  email: string;
  goal: string;
  dailyCommitment: string;
}

export interface PlanData {
  summary: string;
  phases: {
    title: string;
    duration: string;
    focus: string;
    habits: string[];
  }[];
  dailyRoutine: string[];
  wellnessTip: string;
}

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/sigma41llc@gmail.com";
