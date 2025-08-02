
import EpisodeCard from '@/components/Cards/EpisodeCard/EpisodeCard';


interface Params {
    params: {
        id: string;
    };
}


const VideoDetail: React.FC<Params> = ({ params }) => {
    const { id } = params;


    return (

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">


            <EpisodeCard id={id} />


        </div >

    );
};

export default VideoDetail;
