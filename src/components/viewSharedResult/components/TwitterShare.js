import React from 'react';
import PropTypes from 'prop-types';
import { TWITTER_SHARE_URL, TWITTER, SITE_URL} from '../constants';

const TwitterShare = ({ address, name }) => (
    <a
        href={`${TWITTER_SHARE_URL}?u=${SITE_URL}/${address}&quote=${name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="modalTitle__viewResults__shareLink"
    >
        <img
            className="--very --small --greyscale"
            src={TWITTER.src}
            alt={TWITTER.alt}
        />
    </a>
)

export default TwitterShare;

TwitterShare.propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}