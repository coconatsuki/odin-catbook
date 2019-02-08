# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    body { Faker::FamousLastWords.last_words }

    post { create(:post) }
    author { create(:user) }
  end
end
