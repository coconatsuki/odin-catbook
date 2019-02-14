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


class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :smallImageUrl, :largeImageUrl, :created_at
  belongs_to :author, serializer: AuthorSerializer

  attribute(:likes_count) { object.likes.size }
  attribute(:comments_count) { object.comments.size }
  attribute(:liked_by_current_user) { object.liked_by(current_user) ? object.liked_by(current_user).id : nil }
end
