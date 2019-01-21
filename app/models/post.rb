# frozen_string_literal: true

class Post < ApplicationRecord
  validates :body, presence: true, length: { minimum: 5 }

  mount_uploader :picture, PictureUploader

  validate :picture_size

  belongs_to :author, class_name: 'User'
  has_many :comments
  has_many :likes

  def already_like(user)
    likes.find { |like| like.author_id == user.id }
  end

  private

  #--------------------------------- Validates the size of an uploaded picture.
  def picture_size
    if picture.size > 5.megabytes
      errors.add(:picture, "should be less than 5MB")
    end
  end
end
