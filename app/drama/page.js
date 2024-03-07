"use client";
import ProtectedRoute from "@/utils/ProtectedRoute";
import MainNavbar from "@/components/MainNavbar/MainNavbar";

import ShowCard from "@/components/Cards/ShowCard/ShowCard";

const DramaPage = () => {
    return (
        <ProtectedRoute>
            <div>
                <MainNavbar />

                <section className="max-w-7xl py-20 mx-auto h-screen">
                  
                     
                        <div >
                            <ShowCard />
                        </div>

                </section >
            </div >
        </ProtectedRoute>
    );
};

export default DramaPage;
