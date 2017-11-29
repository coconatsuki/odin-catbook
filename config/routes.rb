Rails.application.routes.draw do
  devise_for :users, path_names: { sign_in: 'login', sign_out: 'logout' }

  resources :users, only: [:show, :index, :edit, :update] do
    member do
      get :received_requests, :sent_requests
    end
  end

  resources :posts

  resources :friendships, only: [:create, :destroy, :update]

  root 'posts#index'

end
