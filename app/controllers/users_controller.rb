# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    @cats = User.where.not(id: friends_ids).order(:name)
    respond_to do |format|
      format.html {}
      format.json do
        render json: @cats, each_serializer: NotFriendSerializer
      end
    end
  end

  def show
    @user = User.includes(:posts, posts: %i[author comments likes]).order('posts.created_at desc').find(params[:id])

    respond_to do |format|
      format.html do
        @posts = @user.posts.order(created_at: :desc).includes(:likes, :author, :comments)
        @current_user_friends = current_user.friends
        @pending_friends = current_user.pending_friends
        @user_friends = @user.friends
        @post = current_user.posts.build
        @friendship = Friendship.new
        @comment = Comment.new
        @like = Like.new
      end
      format.json do
        render json: @user, include: 'posts,posts.author,posts.likes'
      end
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.image = nil if user_params[:avatar] || no_picture
    @user.remove_avatar! if user_params[:image] || no_picture
    @user.save
    if @user.update(user_params)
      flash[:notice] = "Profile updated!"
      redirect_to @user
    else
      flash[:warning] = "There was an error. Please try again."
      render 'edit'
    end
  end

  def received_requests
    @requests = Friendship.find_all_requests(current_user)

    respond_to do |format|
      format.html {}
    end
  end

  def sent_requests
    @requests = current_user.sent_pending_friends
  end

  def current
    if params[:withFriends] == "yes"
      return render json: current_user, serializer: CurrentUserWithFriendsSerializer
    end
    if params[:withFriendRequests] == "yes"
      return render json: current_user, serializer: CurrentUserWithRequestsSerializer, include: 'received_pending_friends, received_pending_friends.name'
    end

    render json: current_user, serializer: CurrentUserSerializer
  end

  private

  def no_picture
    !(user_params[:avatar] && user_params[:image])
  end

  def user_params
    parameters = params.require(:user).permit(:name, :email, :avatar, :image)
    parameters[:image] = nil if parameters[:image].blank?
    parameters
  end

  def friends_ids
    ids = current_user.friends.map(&:id)
    ids << current_user.id
  end
end
