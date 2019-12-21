import CLOSED_ELECTION_LOGO from '../../static/icons/closed_election.png';
import OPEN_ELECTION_LOGO from '../../static/icons/open_election.png';

export const VOTERIGHT = 'voteRight';
export const ONGOING_ELECTIONS = 'Ongoing Elections';
export const CONCLUDED_ELECTIONS = 'Concluded Elections';

export const LOGOUT = 'Logout';
export const BODY_CONTENT = [
    {
        header: 'voterLayout__ongoing-election',
        link: 'ongoing-elections',
        src: OPEN_ELECTION_LOGO,
        text: 'Ongoing elections',
    },
    {
        header: 'voterLayout__concluded-election',
        link: 'concluded-elections',
        src: CLOSED_ELECTION_LOGO,
        text: 'Concluded elections',
    },
];

export const BREADCRUMB_NAME_MAP = {
    '/user': 'Home',
    '/user/concluded-elections': 'Concluded Elections',
    '/user/ongoing-elections': 'Ongoing Elections',
};
