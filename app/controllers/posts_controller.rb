# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.html {}
      format.json do
        posts = current_user.feed
        render json: posts
      end
    end
  end

  # def show; end

  # def new
  #   @post = Post.new
  # end

  def create
    # merge => include the argument hash inside the first one.
    @post = Post.create!(post_params.merge(author_id: current_user.id))
    render json: @post
  end

  # def edit
  #   @post = Post.find(params[:id])
  # end

  def update
    @post = Post.find(params[:id])

    @post.update!(post_params)
    render json: @post
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy!
    render json: { post: { id: @post.id } }
  end

  private

  def post_params
    params.require(:post).permit(:body, :smallImageUrl, :largeImageUrl)
  end
end
