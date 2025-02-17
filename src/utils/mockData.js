const videos = [
    {
        videoId: "video01",
        title: "Soja Zara | Baahubali 2 | Madhushree | MM Kreem | Prabhas, Anushka | Hindi Song",
        thumbnailUrl: "https://img.youtube.com/vi/WTjZxav7naU/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/WTjZxav7naU",
        description: "Soja Zara song from Baahubali 2, sung by Madhushree and composed by MM Kreem.",
        channelId: "UCq-Fj5jknLsUf-MWSy4_brA",
        uploader: "T-Series",
        views: 4_500_000,
        likes: 78_000,
        dislikes: 1_200,
        uploadDate: "2017-06-21",
        comments: [
            { commentId: "comment01", userId: "user02", text: "Absolutely mesmerizing!", timestamp: "2024-09-21T08:30:00Z" }
        ]
    },
    {
        videoId: "video02",
        title: "Hey Shokha (হে সখা) | Arna Seal | Rabindra Sangeet | Official Music Video",
        thumbnailUrl: "https://img.youtube.com/vi/UpxTJXxTJJ0/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/UpxTJXxTJJ0",
        description: "A beautiful rendition of the Rabindra Sangeet classic 'Hey Shokha' by Arna Seal.",
        channelId: "UCDJQBlwA8k6JpeFV1ODl8yQ",
        uploader: "Arna Seal Music",
        views: 720_000,
        likes: 18_000,
        dislikes: 320,
        uploadDate: "2022-08-15",
        comments: [
            { commentId: "comment02", userId: "user03", text: "Such a soulful voice!", timestamp: "2024-09-21T09:15:00Z" }
        ]
    },
    {
        videoId: "video03",
        title: "Esho Hey | Tagore Song | Debojyoti Mishra | Iman Chakraborty",
        thumbnailUrl: "https://img.youtube.com/vi/-8R95O4YMts/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/-8R95O4YMts",
        description: "A heartfelt performance of 'Esho Hey' by Iman Chakraborty, composed by Debojyoti Mishra.",
        channelId: "UCYvNHR1R7UZZvOdoBlG1P1A",
        uploader: "Iman Chakraborty Official",
        views: 1_250_000,
        likes: 29_000,
        dislikes: 540,
        uploadDate: "2021-12-10",
        comments: [
            { commentId: "comment03", userId: "user04", text: "Brings peace to the soul.", timestamp: "2024-09-21T10:00:00Z" }
        ]
    },
    {
        videoId: "video04",
        title: "IQOO 13 INDIA FASTEST PHONE | 120FPS TEST 😲🔥| WITH HANDCAM #IQOO13 @toxi_islive #120FPS",
        thumbnailUrl: "https://img.youtube.com/vi/WlS1EyAUCQs/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/WlS1EyAUCQs",
        description: "Dive into the world of gaming with this exciting gameplay video.",
        channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
        uploader: "TOXI IS LIVE",
        views: 347,
        likes: 35,
        dislikes: 0,
        uploadDate: "2020-06-18",
        comments: [
            { commentId: "comment04", userId: "user05", text: "Best tutorial for beginners!", timestamp: "2024-09-21T11:45:00Z" }
        ]
    },
    {
        videoId: "video05",
        title: "ReactJS Crash Course | Traversy Media",
        thumbnailUrl: "https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        description: "A complete React crash course by Traversy Media covering hooks, components, and more.",
        channelId: "UC29ju8bIPH5as8OGnQzwJyA",
        uploader: "Traversy Media",
        views: 3_600_000,
        likes: 120_000,
        dislikes: 2_100,
        uploadDate: "2019-11-12",
        comments: [
            { commentId: "comment05", userId: "user06", text: "Exactly what I needed!", timestamp: "2024-09-21T12:30:00Z" }
        ]
    },
    {
        videoId: "video06",
        title: "Kesariya | Brahmāstra | Arijit Singh | Pritam | Ranbir, Alia",
        thumbnailUrl: "https://img.youtube.com/vi/BddP6PYo2gs/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/BddP6PYo2gs",
        description: "Kesariya song from Brahmāstra, sung by Arijit Singh and composed by Pritam.",
        channelId: "UCq-Fj5jknLsUf-MWSy4_brA",
        uploader: "Sony Music India",
        views: 20_500_000,
        likes: 350_000,
        dislikes: 3_500,
        uploadDate: "2022-07-17",
        comments: [
            { commentId: "comment06", userId: "user07", text: "This song gives me goosebumps!", timestamp: "2024-09-21T13:15:00Z" }
        ]
    },
    {
        videoId: "video07",
        title: "Pasoori | Shae Gill, Ali Sethi | Coke Studio Season 14",
        thumbnailUrl: "https://img.youtube.com/vi/5Eqb_-j3FDA/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/5Eqb_-j3FDA",
        description: "Pasoori, a mesmerizing track from Coke Studio Season 14 by Shae Gill and Ali Sethi.",
        channelId: "UCDJQBlwA8k6JpeFV1ODl8yQ",
        uploader: "Coke Studio",
        views: 100_000_000,
        likes: 1_800_000,
        dislikes: 25_000,
        uploadDate: "2022-02-07",
        comments: [
            { commentId: "comment07", userId: "user08", text: "The best song of the year!", timestamp: "2024-09-21T14:00:00Z" }
        ]
    },
    {
        videoId: "video08",
        title: "JavaScript Full Course | FreeCodeCamp",
        thumbnailUrl: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
        description: "A full JavaScript crash course covering basics to advanced concepts.",
        channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
        uploader: "freeCodeCamp.org",
        views: 5_000_000,
        likes: 250_000,
        dislikes: 4_500,
        uploadDate: "2021-05-10",
        comments: [
            { commentId: "comment08", userId: "user09", text: "Amazing content as always!", timestamp: "2024-09-21T15:30:00Z" }
        ]
    },
    {
        videoId: "video09",
        title: "Learn Tailwind CSS in 1 Hour | Traversy Media",
        thumbnailUrl: "https://img.youtube.com/vi/dFgzHOX84xQ/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/dFgzHOX84xQ",
        description: "A complete introduction to Tailwind CSS for beginners by Traversy Media.",
        channelId: "UC29ju8bIPH5as8OGnQzwJyA",
        uploader: "Traversy Media",
        views: 2_500_000,
        likes: 85_000,
        dislikes: 1_200,
        uploadDate: "2020-09-25",
        comments: [
            { commentId: "comment09", userId: "user10", text: "Best Tailwind tutorial out there!", timestamp: "2024-09-21T16:45:00Z" }
        ]
    }
];

export default videos;
