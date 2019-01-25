# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at
  belongs_to :author, serializer: AuthorSerializer

  attribute(:post_id) { object.post.id }
end
