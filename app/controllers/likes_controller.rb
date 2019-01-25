# frozen_string_literal: true

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
      render json: @like
    else
      render json: { errors: @like.errors.full_messages }
    end
  end

  def destroy
    @like = Like.find(params[:id])

    if @like.destroy
      render json: @like
    else
      render json: { errors: @like.errors.full_messages }
    end
  end
end
