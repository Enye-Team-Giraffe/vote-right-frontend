import CLOSED_ELECTION_LOGO from '../../static/icons/closed_election.png';
import OPEN_ELECTION_LOGO from '../../static/icons/open_election.png';

export const VOTERIGHT = 'voteRight';
export const ONGOING_ELECTIONS = 'Ongoing Elections';
export const CONCLUDED_ELECTIONS = 'Concluded Elections';
export const MENU = {
    a: ['Ongoing Elections', 'ongoing-election'],
    b: ['Concluded Elections', 'concluded-election'],
};
export const LOGOUT = 'Logout';

export const BODY_CONTENT = [
    {
        header: 'voterLayout__ongoing-election',
        src: OPEN_ELECTION_LOGO,
        text: 'Ongoing elections',
    },
    {
        header: 'voterLayout__concluded-election',
        src: CLOSED_ELECTION_LOGO,
        text: 'Concluded elections',
    },
];
