class Post < ApplicationRecord
  validates :title, presence: true
  validates :body, presence: true

  belongs_to :author, class_name: 'User'
  has_many :comments
  has_many :likes

  def already_like(user)
    likes.find { |like| like.author_id == user.id }
  end
end
