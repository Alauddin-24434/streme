'use client'
import React from 'react';
import Layout from '../layout';
import MainNavbar from '@/components/MainNavbar/MainNavbar';

const page = () => {
    return (
        <Layout>
            <MainNavbar></MainNavbar>
            <h2>Liked</h2>
        </Layout>
    );
};

export default page;