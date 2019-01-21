# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def welcome_mail(user)
    @user = user
    mail(to: @user.email, subject: "Welcome to Catbook!")
  end
end
