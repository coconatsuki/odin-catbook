# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :smallImageUrl, :largeImageUrl, :created_at
  belongs_to :author, serializer: AuthorSerializer

  attribute(:likes_count) { object.likes.size }
  attribute(:comments_count) { object.comments.size }
  attribute(:liked_by_current_user) { object.liked_by(current_user) ? object.liked_by(current_user).id : nil }
end
