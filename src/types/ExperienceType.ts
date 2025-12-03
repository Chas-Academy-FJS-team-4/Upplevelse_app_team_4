export interface ExperienceType {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  location: string;
  price: number;
  tags: string[];
  ageGroup: string;
  image: string;
  category: string;
  isTop: boolean;
  isNew: boolean;
}
