export const allComment = ()=>{
    const comments = [
        {
            id: '1001',
            name: 'Alex',
            comment: 'This Video is Very Nice',
            like: 0,
            postDate: '12-11-24',
            image: 'https://i.ibb.co/grkMRWb/Untitled-design-14.png',
            commentReplay: [
                {
                    id: '2001',
                    name: 'Janis King',
                    comment: 'Yes. This vide is very beautiful. Ending moment is very sad. but it good',
                    like: 4,
                    postDate: '12-11-24',
                    image: 'https://i.ibb.co/VqBCp6h/Untitled-design-16.png',  
                    replyTo: 'Alex3453'
                },
                {
                    id: '2002',
                    name: 'Binti Khali',
                    comment: 'Nice Video',
                    like: 0,
                    postDate: '15-01-22',
                    image: 'https://i.ibb.co/ccVZdHs/istockphoto-464628641-612x612.jpg',  
                    replyTo: 'Alex3453'
                }
            ]

        },
        {
            id: '1002',
            name: 'Xlena plx',
            comment: '20 time see this video',
            like: 8,
            postDate: '19-11-23',
            image: 'https://i.ibb.co/qRX9TQD/image.png',
            commentReplay:[]
        }
    ]
    return comments;
}