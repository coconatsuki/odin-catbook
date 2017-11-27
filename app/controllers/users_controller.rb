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
    @user_friends = @user.friends
    @post = current_user.posts.build
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

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def friends_ids
    ids= current_user.friends.map do |friend|
      friend.id
    end
    ids << current_user.id
  end

end
