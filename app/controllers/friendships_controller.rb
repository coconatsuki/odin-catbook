class FriendshipsController < ApplicationController
  def create
    @current_user = User.find(params[:requesting])
    @user = User.find(params[:requested])
    @friendship = @current_user.sent_friendships.new(requested_id: @user.id)
    if @friendship.save
      flash.now[:notice] = "Friend request sent !"
      respond_to do |format|
        format.js
      end
    else
      flash[:warning] = "There was an error."
    end
  end

  def destroy
    @current_user = User.find(params[:deleter])
    @user = User.find(params[:deleting])
    @friendship = Friendship.find_relation(@current_user, @user)
    @friendship.destroy
    respond_to do |format|
      format.html { redirect_to @user }
      format.js # { flash.now[:notice] = "Friendship deleted !" }
    end
  end

  def update
    @friendship = Friendship.find(params[:id])
    if @friendship.update(accepted: true)
      flash.now[:notice] = "New friendship!"
      respond_to do |format|
        format.js
      end
    else
      flash[:warning] = "There was an error."
      render 'received_requests'
    end
  end
end
