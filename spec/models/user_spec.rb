# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is creatable' do
    user = create(:user)
    first_user = User.first
    expect(first_user.name).to eq(user.name)
    expect(first_user.email).to eq(user.email)
  end

  it "has many posts" do
    user = create(:user, :with_posts).reload
    expect(user.posts.first.author).to eq(user)
  end

  it "has many comments" do
    user = create(:user, :with_comments).reload
    expect(user.comments.first.author).to eq(user)
  end

  it "has many likes" do
    user = create(:user, :with_likes).reload
    expect(user.likes.first.author).to eq(user)
  end

  it { should validate_presence_of(:name) }
  it { is_expected.to have_many(:posts) }
  it { is_expected.to have_many(:comments) }
  it { is_expected.to have_many(:likes) }
end
