# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'from@catmail.com'
  layout 'mailer'
end
