# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    @posts = @user.feed

    respond_to do |format|
      format.html {}
      format.json do
        render json: @posts
      end
    end
  end

  def show; end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.author_id = current_user.id

    if @post.save
      render json: @post
    else
      render json: { errors: @post.errors.full_messages }
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      render json: @post
    else
      render json: { errors: @post.errors.full_messages }
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      render json: { post: { id: @post.id } }
    else
      render json: { errors: @post.errors.full_messages }
    end
  end

  private

  def post_params
    params.require(:post).permit(:body, :smallImageUrl, :largeImageUrl)
  end
end
