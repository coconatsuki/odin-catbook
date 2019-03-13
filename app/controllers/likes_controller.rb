# frozen_string_literal: true

class LikesController < ApplicationController
  def index
    @post = Post.find(params[:post_id])
    @likes = @post.likes
  end

  def create
    @post = Post.find(params[:post_id])

    return no_duplication if @post.evaluated_by(current_user)
    return not_permited if @post.author_id == current_user.id

    @like = Like.create!(like_params.merge(author_id: current_user.id).merge(post_id: @post.id))
    render json: @like, include: 'post,post.author'
  end

  def destroy
    @like = Like.find(params[:id])

    if @like.destroy
      render json: @like, include: 'post,post.author'
    else
      render json: { errors: @like.errors.full_messages }
    end
  end

  private

  def like_params
    params.require(:like).permit(:positive)
  end

  def no_duplication
    render json: { errors: ["Sorry, you can't evaluate a post twice."] }
  end

  def not_permited
    render json: { errors: ["Sorry, you can't evaluate your own posts."] }
  end
end
