class Api::V1::PokemonsController < ApiController
    def index
      render json: Pokemon.all
    end
  
    def show
      pokemon = Pokemon.find(params[:id])
      render json: pokemon, serializer: PokemonShowSerializer
    end
  end