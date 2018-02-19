Rails.application.routes.draw do

  mount Attachinary::Engine => "/attachinary"

  resources :estates do
    resources :bookings, only: [:new, :create]
  end

  resources :user do
    resources :bookings
  end

  devise_for :users
  root to: 'pages#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
