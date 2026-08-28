/** The six member story films (assets already in public/video + public/img). */
export interface Story {
  slug: string; name: string; role: string; duration: string; quote: string; alt: string;
}
export const stories: Story[] = [
  { slug: 'rebecca', name: 'Rebecca', role: 'Blueprint member', duration: '1:26',
    quote: '“Coaches that give you unbelievable support… and a community telling you that you’re amazing.”',
    alt: 'Rebecca, a Blueprint Fitness member, in the studio' },
  { slug: 'george', name: 'George', role: 'Blueprint member', duration: '1:05',
    quote: '“I’ve lost almost 17 stone myself.”',
    alt: 'George, a Blueprint Fitness member, in the studio' },
  { slug: 'jayna', name: 'Jayna', role: 'Blueprint member', duration: '0:57',
    quote: '“Blueprint is honestly my happy place.”',
    alt: 'Jayna, a Blueprint Fitness member, in front of the studio sign' },
  { slug: 'sonia', name: 'Sonia', role: 'South Woodford member', duration: '1:03',
    quote: '“You get the individual support, but you get to train with people.”',
    alt: 'Sonia, a Blueprint Fitness member, outside the South Woodford studio' },
  { slug: 'hannah', name: 'Hannah', role: 'Leytonstone member', duration: '0:51',
    quote: '“You always feel like you’ve got someone’s attention.”',
    alt: 'Hannah, a Blueprint Fitness member, in the Leytonstone studio' },
  { slug: 'adrian', name: 'Adrian', role: 'Blueprint member', duration: '0:41',
    quote: '“My favourite thing about BP is the constant push.”',
    alt: 'Adrian, a Blueprint Fitness member, mid-session' },
];
