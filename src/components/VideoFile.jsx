import videos from "../utils/mockData";

function VideoFile(){
    return(
        <section>
            <img src={videos[0].thumbnailUrl} alt="" />
            <h1>{videos[0].title}</h1>
            <h2>{videos[0].uploader}</h2>
            <p>{videos[0].likes}</p>
        </section>
    );
}

export default VideoFile;