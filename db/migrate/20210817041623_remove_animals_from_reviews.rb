class RemoveAnimalsFromReviews < ActiveRecord::Migration[5.2]
  def change
    change_table :reviews do |t|
      t.remove_references :animal
    end
  end
end
