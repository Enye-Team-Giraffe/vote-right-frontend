import React from 'react';
import PropTypes from 'prop-types';
import { FACEBOOK_SHARER_URL, FACEBOOK, SITE_URL } from '../constants';

const FacebookShare = ({ address, name }) => (
    <a
        href={`${FACEBOOK_SHARER_URL}?u=${SITE_URL}/${address}&quote=${name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="modalTitle__viewResults__shareLink"
    >
        <img
            className="--very --small --greyscale"
            src={FACEBOOK.src}
            alt={FACEBOOK.alt}
        />
    </a>
);

export default FacebookShare;

FacebookShare.propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};
