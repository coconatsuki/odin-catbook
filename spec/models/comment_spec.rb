# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  it 'is creatable' do
    comment = create(:comment)
    first_comment = Comment.first
    expect(first_comment.body).to eq(comment.body)
  end

  it { should validate_presence_of(:body) }
end
