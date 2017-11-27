class Post < ApplicationRecord

  validates :title, presence: true
  validates :body, presence: true

  belongs_to :author, class_name: 'User'
  has_many :comments
  has_many :likes
end
