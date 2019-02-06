# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    body { Faker::Movie.quote }
    smallImageUrl { "some/small/image.url" }
    largeImageUrl { "some/large/image.url" }

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
