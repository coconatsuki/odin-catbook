Rails.application.routes.draw do
  devise_for :users, path_names: { sign_in: 'login', sign_out: 'logout' }

  resources :users, only: [:show, :index, :edit, :update]

  resources :posts



  root 'posts#index'

end
