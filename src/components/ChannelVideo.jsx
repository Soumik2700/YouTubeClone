function ChannelVideo({video, channelName}){
    // console.log(video);
    // console.log(channelName);
    return(
        <div className="flex flex-col">
            <img src={video.thumbnailUrl} alt="" />
            <h1 className="text-md font-bold">{video.title}</h1>
            <h1 className="text-white opacity-45">
                {channelName} . {video.likes > 1000000 ? (video.likes / 1000000) + "M" : video.likes > 1000 ? (video.likes / 1000) + "K" : video.likes}   
            </h1>
        </div>
    );
}

export default ChannelVideo;