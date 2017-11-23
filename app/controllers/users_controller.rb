class UsersController < ApplicationController
  def index

  end

  def show
    if current_user
      @user = current_user
      @posts = @user.posts
    end
  end
end
