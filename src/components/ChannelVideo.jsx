function ChannelVideo({video}){

    return(
        <div className="flex flex-col">
            <img src={video.thumbnailUrl} alt="" />
            <h1 className="text-md font-bold">{video.title}</h1>
        </div>
    );
}

export default ChannelVideo;