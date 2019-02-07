# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Like, type: :model do
  it 'is creatable' do
    like = create(:like)
    first_like = Like.first
    expect(first_like.author).to eq(like.author)
    expect(first_like.post).to eq(like.post)
  end

  it "belongs to an author" do
    like = create(:like).reload
    expect(like.author.likes.first).to eq(like)
  end

  it "belongs to a post" do
    like = create(:like).reload
    expect(like.post.likes.first).to eq(like)
  end

  it { is_expected.to belong_to(:author).class_name('User') }
  it { is_expected.to belong_to(:post) }
end
