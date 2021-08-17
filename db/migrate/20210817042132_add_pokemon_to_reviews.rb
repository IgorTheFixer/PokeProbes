class AddPokemonToReviews < ActiveRecord::Migration[5.2]
  def change
    change_table :reviews do |t|
      t.belongs_to :pokemon 
    end
  end
end