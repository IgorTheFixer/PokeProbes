class PokemonSerializer < ActiveModel::Serializer
  attributes :id, :name, :body, :photo_path
end
