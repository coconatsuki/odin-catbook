# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at
  belongs_to :author, serializer: AuthorSerializer
end
