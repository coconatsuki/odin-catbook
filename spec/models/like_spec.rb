# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Like, type: :model do
  it 'is creatable' do
    like = create(:like)
    first_like = Like.first
    expect(first_like.author).to eq(like.author)
  end
end
