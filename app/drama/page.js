

import ProtectedRoute from "@/utils/ProtectedRoute";

import MainNavbar from "@/components/MainNavbar/MainNavbar";


import ShowBannerSlide from "@/components/Cards/ShowCard/ShowBannerSlide/ShowBannerSlide";
import ShowCard from "@/components/Cards/ShowCard/ShowCard";




const Videos = () => {
  

    return (
        <ProtectedRoute>
            <div>
            <MainNavbar  />

                <section className="max-w-7xl mx-auto h-screen">

                    <div className='flex '>

                        <div className="flex flex-col ">

                            <div >
                                <ShowBannerSlide  />
                                <div >
                                    <ShowCard />
                                </div>

                            </div>

                        </div>
                    </div>



                </section >
            </div >
        </ProtectedRoute>
    );
};

export default Videos;
