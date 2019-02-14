# frozen_string_literal: true

# == Schema Information
#
# Table name: posts
#
#  id            :bigint(8)        not null, primary key
#  body          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  author_id     :integer
#  smallImageUrl :string
#  largeImageUrl :string
#

class Post < ApplicationRecord
  validates :body, presence: true, length: { minimum: 5 }

  belongs_to :author, class_name: 'User'
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  def liked_by(user)
    likes.find_by(author_id: user.id)
  end
end
