# frozen_string_literal: true

class AuthorSerializer < ActiveModel::Serializer
  attributes :id, :name, :cropped_profile_pic
end
