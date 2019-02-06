# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is creatable' do
    user = create(:user)
    first_user = User.first
    expect(first_user.name).to eq(user.name)
    expect(first_user.email).to eq(user.email)
  end

  it { should validate_presence_of(:name) }
end
