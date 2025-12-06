export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    image: "/vercel.svg",
    title: "title of the event",
    slug: "slug of the event",
    location: "location of the event",
    date: "date",
    time: "time",
  },
  {
    image:
      "https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/_25A9606-2image1_0s2LplJ.2e16d0ba.fill-1200x600.jpg",
    title: "DevFest 2018 Kickoff! - Google Developers Blog",
    slug: "event-1",
    location: "GDG Vijayawada",
    date: "12-12-2025",
    time: "10:00 AM",
  },
  {
    image:
      "https://developers.google.com/community/devfest/images/devfest-social-no-year.png",
    title: "DevFest | Google for Developers",
    slug: "event-2",
    location: "Texas",
    date: "18-11-2025",
    time: "11:00 AM",
  },
  {
    image:
      "https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/_25A9606-2image1_0s2LplJ.2e16d0ba.fill-1200x600.jpg",
    title: "DevFest 2018 Kickoff! - Google Developers Blog",
    slug: "event-3",
    location: "GDG Vijayawada",
    date: "12-12-2025",
    time: "10:00 AM",
  },
  {
    image:
      "https://developers.google.com/community/devfest/images/devfest-social-no-year.png",
    title: "DevFest | Google for Developers",
    slug: "event-4",
    location: "Texas",
    date: "18-11-2025",
    time: "11:00 AM",
  },
];

export type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};
