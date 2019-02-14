# frozen_string_literal: true

# == Schema Information
#
# Table name: comments
#
#  id         :bigint(8)        not null, primary key
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer
#  post_id    :integer
#


class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :post
  belongs_to :author, class_name: 'User'
end
