# frozen_string_literal: true

# == Schema Information
#
# Table name: likes
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  author_id  :integer
#  post_id    :integer
#


class Like < ApplicationRecord
  belongs_to :post
  belongs_to :author, class_name: 'User'
end
