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

  it "has many sent frienships" do
    user = create(:user, :with_sent_friendships).reload
    expect(user.sent_friendships.first.requesting).to eq(user)
  end

  it "has many received frienships" do
    user = create(:user, :with_received_friendships).reload
    expect(user.received_friendships.first.requested).to eq(user)
  end

  it "has many sent pending frienships" do
    user = create(:user, :with_sent_pending_friendships).reload
    expect(user.sent_pending_friends.first.received_pending_friends.first).to eq(user)
  end

  it "has many received pending frienships" do
    user = create(:user, :with_received_pending_friendships).reload
    expect(user.received_pending_friends.first.sent_pending_friends.first).to eq(user)
  end

  it "has many sent active frienships" do
    user = create(:user, :with_sent_active_friendships).reload
    expect(user.sent_active_friends.first.received_active_friends.first).to eq(user)
  end

  it "has many received pending frienships" do
    user = create(:user, :with_received_active_friendships).reload
    expect(user.received_active_friends.first.sent_active_friends.first).to eq(user)
  end

  it { should validate_presence_of(:name) }
  it { is_expected.to have_many(:posts) }
  it { is_expected.to have_many(:comments) }
  it { is_expected.to have_many(:likes) }
  it { is_expected.to have_many(:sent_pending_friends) }
  it { is_expected.to have_many(:received_pending_friends) }
  it { is_expected.to have_many(:sent_active_friends) }
  it { is_expected.to have_many(:received_active_friends) }
end