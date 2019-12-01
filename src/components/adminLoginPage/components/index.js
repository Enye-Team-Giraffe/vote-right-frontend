import React from 'react';
import withLayout from '../../layout';
import AdminLogin from './AdminLogin';
import WhyNin from './WhyNin';

const AdminLoginWithLayout = withLayout(AdminLogin, WhyNin);

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
