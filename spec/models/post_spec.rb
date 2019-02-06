# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Post, type: :model do
  it 'is creatable' do
    post = create(:post)
    first_post = Post.first
    expect(first_post.body).to eq(post.body)
  end

  it { should validate_presence_of(:body) }
end
