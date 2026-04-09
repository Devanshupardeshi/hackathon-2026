export type UserRole = "student" | "admin" | "recruiter";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bio: string;
  skills: string[];
}

export type PostCategory = "Placement" | "Projects" | "Learning" | "Clubs";

export interface PostAuthor {
  _id: string;
  name: string;
  role: UserRole;
}

export interface PostComment {
  _id: string;
  user: PostAuthor;
  text: string;
  createdAt?: string;
}

export interface Post {
  _id: string;
  author: PostAuthor | string;
  content: string;
  imageUrl?: string;
  category: PostCategory;
  likes: string[] | PostAuthor[];
  comments: PostComment[];
  createdAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface PlacementPoster {
  _id: string;
  name: string;
  role: UserRole;
  email?: string;
}

export interface Placement {
  _id: string;
  title: string;
  company: string;
  description?: string;
  /** Set when loaded with populate (API returns this for all users). */
  postedBy?: PlacementPoster | string;
  applications: { applicant: string; resumeUrl: string }[];
  createdAt: string;
}

export interface EventItem {
  _id: string;
  title: string;
  description?: string;
  date: string;
  createdBy?: PostAuthor;
  attendees: string[];
}

export interface DashboardPayload {
  welcome: string;
  upcomingEvents: EventItem[];
  tasks: Task[];
  placements: Placement[];
  aiSuggestions: string[];
}
