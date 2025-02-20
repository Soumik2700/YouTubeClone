import { MdModeEdit, MdOutlineDelete } from "react-icons/md";
import { useState, useEffect } from "react";

function Comment({ comment, onEdit, setCommentId }) {
    const [isClickedEdit, setIsClickEdit] = useState(false);
    const [editComment, setEditComment] = useState(comment.text);

    useEffect(() => {
        if (!isClickedEdit) return;

        const handleClickOutside = (event) => {
            if (!event.target.closest(".edit-comment")) {
                setIsClickEdit(false);
                onEdit(comment.commentId, editComment);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isClickedEdit, editComment, onEdit]);

    return (
        <div className="m-3 p-3 bg-gray-800 rounded-lg shadow-md">
            {/* Commenter Info */}
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-gray-600 w-10 h-10 flex items-center justify-center rounded-full">
                    <span className="text-white text-sm font-bold">{comment.userId[0].toUpperCase()}</span>
                </div>
                <div>
                    <h2 className="text-white font-semibold">{comment.userId}</h2>
                    <p className="text-gray-400 text-xs">{new Date(comment.timestamp).toLocaleString()}</p>
                </div>
            </div>

            {/* Comment Text */}
            {isClickedEdit ? (
                <input
                    className="w-full p-2 bg-gray-700 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    autoFocus
                />
            ) : (
                <p className="text-white p-2 bg-gray-700 rounded-lg">{comment.text}</p>
            )}

            {/* Edit & Delete Buttons */}
            <div className="flex justify-end gap-3 mt-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsClickEdit(true);
                        setEditComment(comment.text);
                    }}
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition duration-200"
                >
                    <MdModeEdit size={18} />
                    <span className="text-sm">Edit</span>
                </button>
                <button
                    onClick={() => setCommentId(comment.commentId)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 transition duration-200"
                >
                    <MdOutlineDelete size={18} />
                    <span className="text-sm">Delete</span>
                </button>
            </div>
        </div>
    );
}

export default Comment;
