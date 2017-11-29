class UsersController < ApplicationController
  def index
    if current_user
      @cats = User.where.not(id: friends_ids)
    end
  end

  def show
    @user = User.find(params[:id])
    @posts = @user.posts.order(created_at: :desc)
    @current_user_friends = current_user.friends
    @pending_friends = current_user.pending_friends
    @user_friends = @user.friends
    @post = current_user.posts.build
    @friendship = Friendship.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
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
  end

  def sent_requests
    @requests = current_user.sent_pending_friends
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def friends_ids
    ids = current_user.all_friends.map { |friend| friend.id }
    ids << current_user.id
  end
end
