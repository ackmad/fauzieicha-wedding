export interface WeddingData {
  basics: {
    groomName: string;
    brideName: string;
    weddingDate: string;
    footerDate: string;
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
