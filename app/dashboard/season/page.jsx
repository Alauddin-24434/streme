
import DynamicTable from '@/components/dashboard/table/dynamicTable';
import React from 'react';

const SeasonPage = () => {
    const dbutton="Add Season"
    return (
        <div>
            <DynamicTable dbutton={dbutton}/>
        </div>
    );
};

export default SeasonPage;