# frozen_string_literal: true

class Post < ApplicationRecord
  validates :body, presence: true, length: { minimum: 5 }

  belongs_to :author, class_name: 'User'
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  def liked_by(user)
    liked_by_user = likes.find { |like| like.author_id == user.id }
    liked_by_user ? liked_by_user.id : nil
  end
end
