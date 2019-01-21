# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :smallImageUrl, :largeImageUrl, :created_at
  belongs_to :author, serializer: AuthorSerializer
end
