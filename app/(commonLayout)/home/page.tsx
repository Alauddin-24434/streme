
'use client'

import CelibratyCard from "@/components/Cards/CelibratyCard/CelibratyCard";
import ShowCard from "@/components/Cards/ShowCard/ShowCard";
import VideoCard from "@/components/Cards/VideoCard/VideoCard";
import ChatModal from "@/components/chat/chatModal";


export default function HomePage() {


    return (

        <div className="flex flex-col min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">



            <VideoCard />
            <CelibratyCard />
            <ShowCard />
            <ChatModal />



        </div>

    );
};
