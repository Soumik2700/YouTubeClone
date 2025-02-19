import { MdModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { useState, useEffect } from "react";

function Comment({ comment, onEdit }) {
    const [isClickedEdit, setIsClickEdit] = useState(false);
    const [editComment, setEditComment] = useState(comment.text);

    useEffect(() => {
        if (!isClickedEdit) return; // ✅ Run effect only when edit mode is active

        const handleClickOutside = (event) => {
            if (!event.target.closest(".edit-comment")) {
                setIsClickEdit(false);
                onEdit(comment.commentId, editComment); // ✅ Save updated comment
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isClickedEdit, editComment, onEdit]); // ✅ Depend on editComment & onEdit

    return (
        <div className="m-2 bg-gray-700 p-2 rounded-lg flex items-center justify-between edit-comment">
            {isClickedEdit ? (
                <input
                    className="text-white w-full break-words px-2 bg-gray-600 border border-gray-400 rounded"
                    type="text"
                    placeholder="Edit comment"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    autoFocus
                />
            ) : (
                <h1 className="text-white w-full break-words">{comment.text}</h1>
            )}
            <div className="flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsClickEdit(true);
                        setEditComment(comment.text); // ✅ Reset input field on edit
                    }}
                >
                    <MdModeEdit />
                </button>
                <button>
                    <MdOutlineDelete />
                </button>
            </div>
        </div>
    );
}

export default Comment;
