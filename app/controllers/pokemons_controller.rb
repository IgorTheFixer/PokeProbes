class PokemonsController < ApplicationController
    before_action :authenticate_user!
  
    def new
      @pokemon = Pokemon.new
    end
  
    def create
      @pokemon = Pokemon.new(pokemons_params)
  
      if @pokemon.save
        flash[:success] = "Pokemon added successfully"
        redirect_to "/pokemons/#{@pokemon.id}"
      else
        flash.now[:error] = @pokemon.errors.full_messages.to_sentence
        render :new
      end
    end
  
    private
  
    def pokemons_params
      params.require(:pokemon).permit(:name, :body, :photo_path)
    end
  end