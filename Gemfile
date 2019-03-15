# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end
ruby '2.4.4'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.4'
# Use postgrl as the database for Active Record
gem "better_errors"
gem "binding_of_caller"
gem 'faker'
gem 'pg'
# Flexible authentication solution for Rails with Warden
gem 'devise'
# Simple, Heroku-friendly Rails app configuration using ENV and a single YAML file
gem 'figaro'
# User MiniMagick
gem "mini_magick"
# Classier solution for file uploads for Rails, Sinatra and other Ruby web frameworks
gem 'carrierwave', '~> 1.0'
# Bootstrap
gem 'bootstrap-sass'
# jQuery needed for bootstrap
gem 'jquery-rails'
# For pagination
gem 'will_paginate'
# For jobs
gem 'sidekiq'
# for timeout (puma)
gem "rack-timeout"
gem 'webpacker', '>= 4.0.x'
# For writing json easily
gem 'active_model_serializers', '~> 0.10.0'

# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'rubocop'
  gem 'selenium-webdriver'
  gem 'rspec-rails', '~> 3.8'
  gem 'factory_bot_rails'
  gem 'faker'
  gem "nyan-cat-formatter"
  gem 'shoulda-matchers', '~> 3.0'
  gem 'simplecov', require: false
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'web-console', '>= 3.3.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem "annotate", require: false
end

group :production do
  gem "sentry-raven"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
