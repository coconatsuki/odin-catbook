class LikesController < ApplicationController

  def index
    @post = Post.find(params[:post_id])
    @likes = @post.likes
  end

  def create
    @post = Post.find(params[:post_id])
    @like = Like.new
    @like.post = @post
    @like.author = current_user
    if @like.save
      flash.now[:notice] = "Post liked !"
      respond_to do |format|
        format.js
      end
    else
      flash.now[:warning] = "There was an error while liking a post."
    end
  end

  def destroy
    
  end


end
