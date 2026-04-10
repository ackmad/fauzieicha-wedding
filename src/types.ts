export interface WeddingData {
  basics: {
    groomName: string;
    groomNickname: string;
    brideName: string;
    brideNickname: string;
    weddingDate: string;
    footerDate: string;
    hashtag: string;
  };
  families: {
    id: { groom: string; bride: string };
    en: { groom: string; bride: string };
  };
  events: {
    id: string;
    type: { id: string; en: string };
    name: { id: string; en: string };
    time: { id: string; en: string };
    location: string;
    address: string;
    mapsLink: string;
  }[];
  timeline: {
    year: string;
    title: { id: string; en: string };
    text: { id: string; en: string };
  }[];
  bankAccounts: {
    id: string;
    bank: string;
    name: string;
    number: string;
  }[];
  translations: {
    id: Record<string, string>;
    en: Record<string, string>;
  };
}

export interface Wish {
  id?: string;
  name: string;
  text: string;
  isAttending: boolean;
  createdAt?: any; // Firestore Timestamp
}
