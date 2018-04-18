Rails.application.routes.draw do
  # devise_for :user
  devise_for :users, path: "api/v1/auth", only: [:invitations],
    controllers: { invitations: 'api/v1/user_invitations' }
  namespace :api do
    namespace :v1 do
      root to: "dashboard#index"
      get "/dashboard", to: "dashboard#index"

      mount_devise_token_auth_for 'User', at: 'auth', controllers: { invitations: 'api/v1/user_invitations' }
      resources :consortia do
        resources :institutions do
          resources :workshops
        end
      end
      resources :institutions do
        resources :workshops
      end
      resources :workshops do
        post :register
        get :attendees
      end
      resources :users
      resources :institutions

      get '/invited/*invitation_token', to: 'users#invited'
      get "/admins", to: "users#admins"
      get "/institutions/:institution_id/facilitators", to: "institutions#facilitators"
    end
  end
end
