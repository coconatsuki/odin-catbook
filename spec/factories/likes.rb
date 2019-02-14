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


FactoryBot.define do
  factory :like do
    post  { create(:post) }
    author { create(:user) }
  end
end
