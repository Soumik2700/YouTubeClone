import { MdModeEdit, MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";

function Comment({ comment, videoId, setHasSaved,hasDelete ,setHasDelete }) {
    const channelBanner = comment.channelId.channelBanner;
    const timeStamp = comment?.timestamp?.slice(0, 10).replaceAll("-", "/");
    const [isEdit, setIsEdit] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const channelId = user?.[3]?.[0];
    const [text, setText] = useState(comment.text);
    const authToken = localStorage.getItem("authToken");

    async function handelEdit() {
        if (text === comment.text) {
            setIsEdit(false); // No change, just exit edit mode
            return;
        }

        const query = {
            commentId: comment._id,
            channelId,
            text
        };

        try {
            const response = await axios.put(`http://localhost:3000/${videoId}/updateComment`, query,{
                headers:{
                    Authorization:`Bearer ${authToken}`
                }
            });

            setIsEdit(false); // Close edit mode after saving
            setHasSaved(true)
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    async function handelDelete() {
        const query = {
            commentId: comment._id,
            channelId,
            videoId
        };

        try {
            const response = await axios.put(`http://localhost:3000/deleteComment`, query, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // ✅ Fix headers format
                    "Content-Type": "application/json"
                }
            });

            setHasDelete(!hasDelete);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    }


    return (
        <div className="m-3 p-1 rounded-lg text-[10px] flex-col border-b-[1px]">
            {/* User Info */}
            <div className="flex gap-1">
                {channelBanner && <img className="bg-gray-900 w-7 h-7 rounded-[50%]" src={channelBanner} alt="" />}
                <div className="text-[10px] font-bold">
                    <h1>{comment?.channelId?.channelName}</h1>
                    <h1 className="text-[7px]">{timeStamp}</h1>
                </div>
            </div>

            {/* Comment Text */}
            <div className="text-[8px]">
                {isEdit ? (
                    <textarea value={text} onChange={(e) => setText(e.target.value)} />
                ) : (
                    <p>{comment.text}</p>
                )}
            </div>

            {/* Edit & Delete Buttons */}
            {comment.channelId._id === channelId && (
                <div className="gap-1.5 flex float-right text-[7px]">
                    {isEdit ? (
                        <>
                            <button className="flex items-center text-green-400" onClick={handelEdit}>
                                <span>Save</span>
                            </button>
                            <button className="flex items-center text-gray-400" onClick={() => setIsEdit(false)}>
                                <span>Cancel</span>
                            </button>
                        </>
                    ) : (
                        <button className="flex items-center text-blue-400" onClick={() => {
                            setIsEdit(true);
                            setHasSaved(false);
                        }}>
                            <span>Edit</span>
                            <MdModeEdit />
                        </button>
                    )}
                    <button className="flex items-center text-red-400" onClick={handelDelete}>
                        <span>Delete</span>
                        <MdOutlineDelete />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Comment;
