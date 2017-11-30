class CommentsController < ApplicationController

  def index
  end

  def create
    @post = Post.find(params[:post_id])
    @comment = Comment.new(comment_params)
    @comment.post = @post
    @comment.author = current_user
    if @comment.save
      flash.now[:notice] = "You wrote a new comment!"
      respond_to do |format|
        format.js
      end
    else
      flash.now[:notice] = "Sorry, there was an error"
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(post_params)
      flash.now[:notice] = "Comment updated!"
      respond_to do |format|
        format.js
      end
    else
      flash.now[:warning] = "There was an error. Please try again."
    end
  end


  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
