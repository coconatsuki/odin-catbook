# frozen_string_literal: true

class FriendshipsController < ApplicationController
  def create
    @current_user = current_user
    @user = User.find(params[:requested])
    @friendship = @current_user.sent_friendships.new(requested_id: @user.id)

    if @friendship.save
      head :created
    else
      render json: { errors: @friendship.errors.full_messages }
    end
  end

  def update
    @friendship = Friendship.find(params[:id])

    if @friendship.update(accepted: true)
      head :accepted
    else
      render json: { errors: @friendship.errors.full_messages }
    end
  end

  def destroy
    # @current_user = current_user
    # @user = User.find(params[:deleting])
    # @friendship = Friendship.find_relation(@current_user, @user)
    @friendship = Friendship.find(params[:id])

    if @friendship.destroy
      head :destroyed
    else
      render json: { errors: @friendship.errors.full_messages }
    end
  end
end
