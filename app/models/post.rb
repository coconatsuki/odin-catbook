# frozen_string_literal: true

class Post < ApplicationRecord
  validates :body, presence: true, length: { minimum: 5 }

  belongs_to :author, class_name: 'User'
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  def liked_by(user)
    likes.find_by(author_id: user.id)
  end
end
