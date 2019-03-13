# frozen_string_literal: true

class CommentsController < ApplicationController
  def index
    @comments = Comment.includes(:author).where(post_id: params[:post_id])

    render json: @comments, include: 'author'
  end

  def create
    @post = Post.find(params[:post_id])
    @comment = Comment.new(comment_params)
    @comment.post = @post
    @comment.author = current_user

    if @comment.save
      render json: @comment
    else
      render json: { errors: @comment.errors.full_messages }
    end
  end

  def edit
    @post = Post.find(params[:post_id])
    @comment = Comment.find(params[:id])

    respond_to do |format|
      format.js
    end
  end

  def update
    @comment = Comment.find(params[:id])
    @post = @comment.post

    if @comment.update(comment_params)
      render json: @comment
    else
      render json: { errors: @comment.errors.full_messages }
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @post = @comment.post
    if @comment.destroy
      render json: { post: { id: @comment.id } }
    else
      render json: { errors: @comment.errors.full_messages }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
