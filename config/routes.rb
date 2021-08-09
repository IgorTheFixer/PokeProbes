Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  resources :pokemons, only: [:new, :create]

  get '/pokemons', to: 'static_pages#index'
  get '/pokemons/:id', to: 'static_pages#index'

  namespace :api do
    namespace :v1 do
      resources :pokemons, only: [:index, :show] do
        resources :reviews, only: [:create, :destroy] do
          resources :votes, only: [:create]
        end
      end
    end
  end
end
