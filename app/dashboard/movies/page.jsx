
import DynamicTable from '@/components/dashboard/table/dynamicTable';
import React from 'react';

const MoviesPage = () => {
    const dbutton="Add Movie"
    return (
        <div>
           <DynamicTable  dbutton={dbutton}/>
        </div>
    );
};

export default MoviesPage;