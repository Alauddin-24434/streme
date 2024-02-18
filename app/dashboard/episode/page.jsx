
import DynamicTable from '@/components/dashboard/table/dynamicTable';
import React from 'react';

const EpisodePage = () => {
    const dbutton="Add Episode"
    return (
        <div>
            <DynamicTable dbutton={dbutton}/>
        </div>
    );
};

export default EpisodePage;