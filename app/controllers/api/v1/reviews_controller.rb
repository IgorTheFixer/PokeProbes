class Api::V1::ReviewsController < ApiController
    before_action :authenticate_user!
    before_action :authorize_user, except: [:create]
  
    def create
      review = Review.new(review_params)
      review.user = current_user
      review.pokemon_id = params["pokemon_id"]
  
      if review.save
        render json: review
      else
        render json: { error: review.errors.full_messages }
      end
    end
  
    def destroy
      review = Review.find(params[:id])
      pokemon = Pokemon.find(params[:pokemon_id])
      if review.destroy
        render json: pokemon.reviews
      else
        render json: { error: review.errors.full_messages }
      end
    end
  
    private
  
    def review_params
      params.require(:review).permit(:title, :description, :rating)
    end
  
    def authorize_user
      if !user_signed_in? || !current_user.admin?
        raise ActionController::RoutingError.new("Not Found")
      end
    end
  end