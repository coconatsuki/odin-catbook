class PostsController < ApplicationController
  def index
    if current_user
      @user = current_user
      @posts = @user.feed
      @post =  Post.new
      @comment = Comment.new
      @like = Like.new
    end
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
      redirect_to request.referrer || root_url
    else
      render 'new'
    end
  end

    def edit
      @post = Post.find(params[:id])
    end

    def update
      @post = Post.find(params[:id])
      if @post.update(post_params)
        flash[:notice] = "Post updated!"
        redirect_to @post.author
      else
        flash[:warning] = "There was an error. Please try again."
        render 'edit'
      end
    end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
