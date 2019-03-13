# frozen_string_literal: true
# == Schema Information
#
# Table name: posts
#
#  id            :bigint(8)        not null, primary key
#  body          :string
#  smallImageUrl :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  author_id     :integer
#
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#

class PostSerializer < ActiveModel::Serializer
  attributes :id, :body, :smallImageUrl, :created_at
  belongs_to :author, serializer: AuthorSerializer

  attribute(:likes_count) { object.likes.positive.size }
  attribute(:dislikes_count) { object.likes.negative.size }
  attribute(:comments_count) { object.comments.size }
  attribute(:evaluated_by_currentUser) { object.evaluated_by(current_user) ? object.evaluated_by(current_user).id : nil }
  attribute(:liked_by_currentUser) { object.liked_by(current_user) ? object.liked_by(current_user).id : nil }
  attribute(:disliked_by_currentUser) { object.disliked_by(current_user) ? object.disliked_by(current_user).id : nil }
end
