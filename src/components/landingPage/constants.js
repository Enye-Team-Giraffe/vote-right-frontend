import Facebook from '../../static/icons/facebook.svg';
import Instagram from '../../static/icons/instagram.svg';
import Twitter from '../../static/icons/twitter.svg';
import Youtube from '../../static/icons/youtube.svg';

export const FACEBOOK_PAGE = 'https://www.facebook.com';
export const INSTAGRAM_PAGE = 'https://www.instagram.com/';
export const TWITTER_PAGE = 'https://twitter.com/home';
export const YOUTUBE_PAGE = 'https://www.youtube.com/';
export const LOGO = 'voteRight';
export const LOGINETXT = 'Login';

const FACEBOOK = {
    alt: 'Facebook',
    href: FACEBOOK_PAGE,
    src: Facebook,
};
const INSTAGRAM = {
    alt: 'Instagram',
    href: INSTAGRAM_PAGE,
    src: Instagram,
};
const TWITTER = {
    alt: 'Twitter',
    href: TWITTER_PAGE,
    src: Twitter,
};
const YOUTUBE = {
    alt: 'youtube',
    href: YOUTUBE_PAGE,
    src: Youtube,
};

export const FOOTER_ITEMS = [FACEBOOK, INSTAGRAM, TWITTER, YOUTUBE];

const HOME = {
    FIRSTTITLE: 'voteRight',
    HOMETEXT: `VoteRight aims to solve the challenge of voting in Nigeria.
    Ever gone to vote and almost gotten shot, mugged?
    Or maybe you spent hours on the Queue 
    all to spend less than 10 minutes actually voting
    VoteRight to the rescue!!!`,
    SECONDTITLE: 'What do we do?',
    index: 0,
};
const ABOUT = {
    FIRSTTITLE: 'ABOUT',
    HOMETEXT: `VoteRight is a startup located in Nigeria
    which is located in Nigeria, At voteRIght 
    we aim to solve the problems and insurgencies faced during the national election
    using advanced technologies. `,
    SECONDTITLE: 'Blockchain Solution',
    index: 1,
};
const PROBLEM = {
    FIRSTTITLE: 'NATIONAL',
    HOMETEXT: `Voting rates have reduced drastically by a whooping 15% rate in Nigeria,
    This is due to both the stress of commutation and lining up for hours
    as well as health risks attached to voting in the country.
    `,
    SECONDTITLE: 'Voting Problem',
    index: 2,
};
const SOLUTION = {
    FIRSTTITLE: 'Worldclass',
    HOMETEXT: `A solution to this problem is to make voting mobile,
    This is made possible using several measures such as identity verification
    as well as storing the data on the blockchain, where it is legally accessible
    `,
    SECONDTITLE: 'Blockchain Solution',
    index: 3,
};

export const MENUITEMS = [HOME, ABOUT, PROBLEM, SOLUTION];

export const ANIMATION_DURATION = 5000;

