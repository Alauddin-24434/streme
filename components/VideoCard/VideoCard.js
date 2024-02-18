import Image from "next/image";
import Link from "next/link";

const VideoCard = () => {
    const videos = [
        {
          image: 'https://i.ibb.co/3r0xDWf/129690-Jawan-Full-Movie1.jpg',
          views: 1000,
          avatar: 'https://i.ibb.co/bPQx3GL/456322.webp',
          uploadTime: '2',
          title: 'Rough N Rowdy 23 Four Loko Weigh-Ins',
          channelName: 'Channel 1',
        },
        {
          image: 'https://i.ibb.co/K2tG5bZ/340126465-3365006783742542-6703771899005912656-n.jpg',
          views: 1500,
          avatar: 'https://i.ibb.co/bPQx3GL/456322.webp',
          uploadTime: '4',
          title: 'Rough N Rowdy 23 Four Loko Weigh-Ins',
          channelName: 'Channel 2',
        },
        {
          image: 'https://i.ibb.co/bbPVy04/jailer-box-office-tamil-nadu-1692416829885-1692416841022.jpg',
          views: 2000,
          avatar: 'https://i.ibb.co/bPQx3GL/456322.webp',
          uploadTime: '6',
          title: 'Rough N Rowdy 23 Four Loko Weigh-Ins',
          channelName: 'Channel 3',
        },
        {
          image: 'https://i.ibb.co/vHXL8yH/wp5118334.webp',
          views: 1200,
          avatar: 'https://i.ibb.co/bPQx3GL/456322.webp',
          uploadTime: '23',
          title: 'Rough N Rowdy 23 Four Loko Weigh-Ins',
          channelName: 'Channel 4',
        },
        // {
        //   image: 'https://i.ibb.co/LS8DnKg/wp11157463.jpg',
        //   views: 1800,
        //   avatar: 'https://i.ibb.co/bPQx3GL/456322.webp',
        //   uploadTime: '2024-01-25T15:20:00Z',
        //   title: 'Video 5 Title',
        //   channelName: 'Channel 5',
        // }
        // Add more objects as needed
      ];
      
    return (

        <>
        <p className="text-white font-bold px-12 py-5">Top Live Categories</p>
        <div className="px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
                videos.map(item => <Link key={item.image} href={"/video"}>
                <div className="max-w-sm">
                {/* Image link */}
                  <Image className="h-40"
                src={item.image}
                alt="Picture of the author"
              width={400}
              height={200}
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
              />
                {/* Content section */}
                <div className="py-5">
                  {/* Title link */}
                    <h5 className="mb-2 text-[16px] font-medium tracking-tight text-white dark:text-white">{item.title}</h5>
                  <div className="flex items-center gap-3">
                  <Image className="w-9"
                src={item.avatar}
                alt="Picture of the author"
              width={400}
              height={200}
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
              />
                    <div className="text-xs text-white">
                        <p>{item.channelName}</p>
                        <p>{item.uploadTime} Hours ago | {item.views} views</p>
                    </div>
                  </div>
                </div>
              </div></Link>)
            }
        </div></>
    );
};

export default VideoCard;