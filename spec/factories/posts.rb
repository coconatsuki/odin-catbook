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

FactoryBot.define do
  factory :post do
    body { Faker::Movie.quote }
    smallImageUrl { "some/small/image.url" }

    author { create(:user) }

    trait :with_comments do
      after(:create) do |post|
        create_list(:comment, Random.rand(1..4), post: post, author: post.author)
      end
    end

    trait :with_likes do
      after(:create) do |post|
        create_list(:like, Random.rand(1..4), post: post, author: post.author)
      end
    end
  end
end
