import { Avatar, Box, Divider, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import EditIcon from '@mui/icons-material/Edit';
import CommentForm from "./CommentForm";
const Comment = ({ comment, replies, currentUserId, deleteComment, updateComment, activeComment, setActiveComment, parentId = null, addComment }) => {

    // const fiveMinute = 300000;
    // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinute
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment?.userId;
    const canDelete = currentUserId === comment?.userId;
    const createdAt = new Date(comment?.createdAt).toLocaleDateString();
    const isReplying = activeComment && activeComment.type === "replying" && activeComment.id === comment?._id
    const isEditing = activeComment && activeComment.type === "editing" && activeComment.id === comment?._id
    const replyId = parentId ? parentId : comment?._id;
    return (
        <Box>
            <Box key={comment._id} sx={{ display: 'flex', marginTop: '8px', marginBottom: 2 ,color:"white"}}>
                <Avatar sx={{ marginTop: 2 }} alt="Remy Sharp" src={comment?.userImage} />
                <Box sx={{ width: '100%', marginLeft: 3 }}>
                    <Divider />
                    <Typography sx={{ fontWeight: 800, fontSize: 20, marginTop: 2, color: 'white' }}>{comment.username} <span className='text-xs font-normal'>. {createdAt}</span></Typography>
                    {!isEditing && <Typography sx={{ fontWeight: 200, fontSize: 17, marginTop: 1, marginBottom: 1 }}>{comment.body}</Typography>}
                    {isEditing && (
                        <CommentForm
                            submitLabel="Update"
                            hasCancelButton
                            initialText={comment.body}
                            handleSubmit={(text) => updateComment(text, comment._id)}
                            handleCancel={() => setActiveComment(null)}
                        />
                    )}
                    <Box sx={{ display: 'flex', '& > :not(style)': { marginRight: '30px', color: 'white' } }} >
                        <Typography><FavoriteIcon sx={comment.like > 0 ? { color: 'red', marginRight: 1 } : { color: 'white', marginRight: 1 }} />{comment.like > 0 ? comment.like : 'Like'}</Typography>
                        {canReply && <Typography onClick={() => setActiveComment({ id: comment._id, type: 'replying' })}><QuickreplyIcon />Reply</Typography>}
                        {canEdit && <Typography onClick={() => setActiveComment({ id: comment._id, type: 'editing' })}><EditIcon />Edit</Typography>}
                        {canDelete && <Typography onClick={() => deleteComment(comment._id)}><DeleteIcon />Delete</Typography>}
                    </Box>

                    {/* Reply Comment Sections...................................... */}
                    {isReplying && (
                        <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)} />
                    )}
                    {replies.length > 0 && (
                        <Box>
                            {replies.map(reply => (<Comment key={reply._id}
                                comment={reply}
                                replies={[]}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                updateComment={updateComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                parentId={comment._id}
                                addComment={addComment}
                            />
                            ))}
                        </Box>
                    )}

                </Box>

            </Box>
        </Box>
    );
};

export default Comment;