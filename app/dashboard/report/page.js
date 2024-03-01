"use client"
import { useEffect, useState } from "react";
// import * as React from 'react';
// import Dropdown from '@mui/joy/Dropdown';
// import Menu from '@mui/joy/Menu';
// import MenuButton from '@mui/joy/MenuButton';
// import MenuItem from '@mui/joy/MenuItem';


const UserReport = () => {
    const [reports, setReport] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allreport')
            .then(res => res.json())
            .then(data => setReport(data))
    }, [])
    // const [open, setOpen] = React.useState(false);

    // const handleOpenChange = React.useCallback((event, isOpen) => {
    //     setOpen(isOpen);
    // }, []);

    console.log(reports)
    return (
        <div>
            <div className="max-w-screen-md mx-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Video Title</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Report</th>
                            <th className="py-2 px-4 border-b">Video Id</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports?.map((reported) => <tr>
                                <td className="py-2 px-4 border-b"><img className="h-10 w-10 rounded" src={reported?.imageurl}></img></td>
                                <td className="py-2 px-4 border-b">{reported?.title}</td>
                                <td className="py-2 px-4 border-b">{reported.email}</td>
                                <td className="py-2 px-4 border-b">
                                    <ul>
                                        <li>
                                            <details className="hover:cursor-pointer">
                                                <summary className="text-white">
                                                    Parent
                                                </summary>
                                                <ul className="text-white">
                                                    {
                                                        reported?.report?.map((reporte)=><li>{reporte}</li>                            
                                                        )
                                                    }
                                                </ul>
                                            </details>
                                        </li>
                                    </ul>
                                </td>
                                <td className="py-2 px-4 border-b text-white">{reported?.videoId}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserReport;