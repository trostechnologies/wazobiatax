/**
 * Tax education video catalog. Playback uses a YouTube embed, so each entry only
 * needs a YouTube video id.
 *
 * `youtubeId: null` means no real video has been assigned yet — the player shows
 * a "coming soon" state instead of trying to play something that doesn't exist.
 * Replace with a real YouTube video id (the part after `v=` in a YouTube URL) to
 * make that video playable.
 */
export interface EducationVideo {
  id: number;
  titleKey: 'videoTaxObligations' | 'videoVatReturns' | 'videoTaxExemptions';
  duration: string;
  thumbnail: string;
  views: string;
  completed: boolean;
  youtubeId: string | null;
}

export const educationVideos: EducationVideo[] = [
  {
    id: 1,
    titleKey: 'videoTaxObligations',
    duration: '5:30',
    thumbnail: '📊',
    views: '1.2K',
    completed: false,
    youtubeId: null,
  },
  {
    id: 2,
    titleKey: 'videoVatReturns',
    duration: '8:45',
    thumbnail: '📝',
    views: '850',
    completed: true,
    youtubeId: null,
  },
  {
    id: 3,
    titleKey: 'videoTaxExemptions',
    duration: '6:20',
    thumbnail: '💡',
    views: '2.1K',
    completed: false,
    youtubeId: null,
  },
];
