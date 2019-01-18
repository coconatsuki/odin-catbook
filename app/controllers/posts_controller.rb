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
        json_hash = { posts: [] }
        @posts.each do |post|
          json_hash[:posts] << { id: post.id, body: post.body, created_at: post.created_at, author: {id: post.author_id, name: User.find(post.author_id).name} }
        end
        render json: json_hash
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

    respond_to do |format|
      format.html do
        if @post.save
          flash[:success] = "Post created!"
          redirect_to request.referer || root_url
        else
          render 'new'
        end
      end

      format.json do
        if @post.save
          render json: {post: { id: @post.id, body: @post.body, created_at: @post.created_at, author: {id: @post.author_id, name: User.find(@post.author_id).name} }}
        else
          render json: {errors: @post.errors.full_messages}
        end
      end
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])

    respond_to do |format|
      format.html do
        if @post.update(post_params)
          flash[:notice] = "Post updated!"
          redirect_to @post.author
        else
          flash[:warning] = "There was an error. Please try again."
          render 'edit'
        end
      end

      format.json do
        if @post.update(post_params)
          render json: {post: { id: @post.id, body: @post.body, created_at: @post.created_at, author: {id: @post.author_id, name: User.find(@post.author_id).name} }}
        else
          render json: {errors: @post.errors.full_messages}
        end
      end
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      render json: {post: { id: @post.id}}
    else
      render json: {errors: @post.errors.full_messages}
    end
  end

  private

  def post_params
    params.require(:post).permit(:body, :picture)
  end
end
