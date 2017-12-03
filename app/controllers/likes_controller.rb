class LikesController < ApplicationController

  def index
    @post = Post.find(params[:post_id])
    @likes = @post.likes
  end

  def create
    @post = Post.find(params[:post_id])
    if @post.already_like(current_user)
      flash.now[:warning] = "You already liked this post noob."
      render json: {error: "You already liked this post noob."}
      return
    end
    @like = Like.new
    @like.post = @post
    @like.author = current_user
    if @like.save
      # flash.now[:notice] = "Post liked !"
      respond_to do |format|
        format.js
      end
    else
      flash.now[:warning] = "There was an error while liking a post."
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @post = Post.find(params[:post_id])
    if @like.destroy
      # flash.now[:notice] = "Post unliked !"
      respond_to do |format|
        format.js
      end
    else
      flash.now[:warning] = "There was an error while unliking."
    end
  end


end
