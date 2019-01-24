# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :smallImageUrl, :largeImageUrl, :created_at
  belongs_to :author, serializer: AuthorSerializer

  attribute(:likes_count) { object.likes.size }
  attribute(:liked_by_current_user) { object.already_liked(current_user) }
end
