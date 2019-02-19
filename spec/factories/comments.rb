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
# Foreign Keys
#
#  fk_rails_...  (author_id => users.id)
#  fk_rails_...  (post_id => posts.id)
#

FactoryBot.define do
  factory :comment do
    body { Faker::FamousLastWords.last_words }

    post { create(:post) }
    author { create(:user) }
  end
end
