# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, path_names: { sign_in: 'login', sign_out: 'logout' }, path: 'auth'

  resources :users, only: %i[show index update] do
    collection do
      get :current
      get :stats
    end
  end

  resources :posts, except: %i[new edit show] do
    resources :likes, only: %i[create destroy]
    resources :comments, only: %i[index create update destroy]
  end

  resources :friendships, only: %i[create destroy update]
  get :received_requests, to: 'posts#index'

  root 'posts#index'
end
