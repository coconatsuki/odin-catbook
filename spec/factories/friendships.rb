# frozen_string_literal: true

FactoryBot.define do
  factory :friendship do
    requested { create(:user) }
    requesting { create(:user) }

    trait :pending do
      accepted { false }
    end

    trait :accepted do
      accepted { true }
    end
  end
end
