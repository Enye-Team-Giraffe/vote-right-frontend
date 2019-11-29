import React from 'react';
import withLayout from '../../layout';
import AdminLogin from './AdminLogin';

const AdminLoginWithLayout = withLayout(AdminLogin);

/**
 * Login page
 * @return {jsx component} Login page
 */
function adminLogin() {
    return (
        <AdminLoginWithLayout />
    );
}

export default adminLogin;
