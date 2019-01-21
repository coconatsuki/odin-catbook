# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    if current_user
      @user = current_user
      @posts = @user.feed
      @post =  Post.new
      @comment = Comment.new
      @like = Like.new
    end

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
    params.require(:post).permit(:body, :picture)
  end
end
