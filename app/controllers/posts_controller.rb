class PostsController < ApplicationController
  def index
  end

  def show
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.author_id = current_user.id
    if @post.save
      flash[:success] = "Post created!"
      redirect_to root_path
    else
      render 'new'
    end
  end

  def edit
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end


if @micropost.save
  flash[:success] = "Micropost created!"
  redirect_to root_url
else
  @feed_items = []
  render 'static_pages/home'
end
