
import DynamicTable from '@/components/dashboard/table/dynamicTable';
import React from 'react';

const ShowListPage = () => {
    const dbutton="Add Show"
    return (
        <div>
            <DynamicTable dbutton={dbutton}/>
        </div>
    );
};

export default ShowListPage;