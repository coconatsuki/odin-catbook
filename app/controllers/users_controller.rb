# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.html {}
      format.json do
        @cats = User.where.not(id: friends_ids).order(:name)
        render json: @cats, each_serializer: NotFriendSerializer
      end
    end
  end

  def show
    @user = User.includes(:posts, posts: %i[author comments likes]).order('posts.created_at desc').find(params[:id])

    respond_to do |format|
      format.html {}
      format.json do
        render json: @user, include: 'posts,posts.author,posts.likes'
      end
    end
  end

  # def edit
  #   @user = User.find(params[:id])
  # end

  def update
    @user = User.find(params[:id])

    @user.update!(user_params)
    render json: @user
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

  def stats
    max_posts = SelectUserWithMaxPosts.execute(current_user.id)
    max_comments = SelectUserWithMaxComments.execute(current_user.id)
    max_likes = SelectUserWithMaxLikes.execute(current_user.id)
    max_poo = SelectUserWithMaxPoo.execute(current_user.id)
    render json: { max_posts: max_posts.to_h, max_comments: max_comments.to_h, max_likes: max_likes.to_h,
                   max_poo: max_poo.to_h }
  end

  private

  def user_params
    # Fetch user_params only once. Begin => We use it when we have more than one line to execute.
    @user_params ||= begin
      parameters = params.require(:user).permit(:name, :email, :breed, :birthday, :country, :city, :cropped_profile_pic,
                                                :small_profile_pic, :cropped_cover_pic, :small_cover_pic, things_i_like: [], things_i_hate: [])
      parameters
    end
  end

  def friends_ids
    ids = current_user.friends.map(&:id)
    ids << current_user.id
  end
end
